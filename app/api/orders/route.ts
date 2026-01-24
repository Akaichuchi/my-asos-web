import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  // Đổi kiểu dữ liệu userId thành any để chấp nhận chuỗi UUID từ Database
  let userId: any; 
  let totalAmount: number = 0;
  let originalBalance: number = 0;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(`Cấu hình chưa hoàn tất: ${!supabaseUrl ? 'Thiếu URL' : ''} ${!supabaseKey ? 'Thiếu Key' : ''}`);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await req.json();
    
    // Giữ nguyên giá trị gốc (Chuỗi UUID) thay vì ép về Number
    userId = body.userId; 
    totalAmount = Number(body.totalAmount);

    // 1. Kiểm tra số dư và lưu lại số dư cũ để dự phòng hoàn tiền
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("balance")
      .eq("id", userId)
      .single();

    if (userError || !user) throw new Error("Người dùng không tồn tại trên hệ thống");
    
    originalBalance = Number(user.balance);

    if (originalBalance < totalAmount) {
      throw new Error(`Số dư không đủ. Bạn có $${originalBalance} nhưng cần $${totalAmount}`);
    }

    // 2. Thực hiện trừ tiền
    const newBalance = originalBalance - totalAmount;
    const { error: updateError } = await supabase
      .from("User")
      .update({ balance: newBalance })
      .eq("id", userId);

    if (updateError) throw new Error("Lỗi hệ thống khi trừ tiền, vui lòng thử lại");

    // 3. Tạo bản ghi đơn hàng mới (Dữ liệu gửi đi đã khớp với kiểu UUID trong Database)
    const { data: result, error: orderError } = await supabase
      .from("Order")
      .insert([{ 
        userId: userId, 
        amount: totalAmount, 
        status: "SUCCESS" 
      }])
      .select()
      .single();

    if (orderError) {
      // CƠ CHẾ TỰ ĐỘNG HOÀN TIỀN NẾU TẠO ĐƠN LỖI
      await supabase.from("User").update({ balance: originalBalance }).eq("id", userId);
      
      console.error("Order insertion failed, refunding...", orderError.message);
      // Trả về lỗi chi tiết từ Supabase để biết chính xác cột nào đang sai
      throw new Error(`Tiền đã trừ nhưng lỗi tạo đơn: ${orderError.message}. Hệ thống đã tự động hoàn tiền!`);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Thanh toán thành công", 
      data: result 
    });

  } catch (error: any) {
    console.error("Payment API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}