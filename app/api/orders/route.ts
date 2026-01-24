import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  // Giữ nguyên các khai báo biến bên ngoài theo bố cục của bạn
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
    
    // Ép kiểu Number để khớp với kiểu int8 trong Database (Tránh lỗi UUID)
    userId = Number(body.userId); 
    totalAmount = Number(body.totalAmount);

    // Lấy thông tin từ body gửi từ CartPage
    const productName = body.productName || "Đơn hàng dịch vụ";
    const imageUrl = body.imageUrl || "";

    // 1. Kiểm tra số dư từ bảng User (Khớp với tab public.User trong ảnh của bạn)
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

    // 2. Thực hiện trừ tiền trong bảng User
    const newBalance = originalBalance - totalAmount;
    const { error: updateError } = await supabase
      .from("User")
      .update({ balance: newBalance })
      .eq("id", userId);

    if (updateError) throw new Error("Lỗi hệ thống khi trừ tiền, vui lòng thử lại");

    // 3. Tạo bản ghi đơn hàng mới vào bảng Order
    // ĐÃ CẬP NHẬT: product_name và image_url để khớp 100% với ảnh Supabase bạn gửi
    const { data: result, error: orderError } = await supabase
      .from("Order")
      .insert([{ 
        userId: userId, 
        amount: totalAmount, 
        status: "SUCCESS",
        product_name: productName, // Sửa từ productName thành product_name
        image_url: imageUrl         // Sửa từ imageUrl thành image_url
      }])
      .select()
      .single();

    if (orderError) {
      // CƠ CHẾ TỰ ĐỘNG HOÀN TIỀN NẾU TẠO ĐƠN LỖI
      await supabase.from("User").update({ balance: originalBalance }).eq("id", userId);
      
      console.error("Order insertion failed, refunding...", orderError.message);
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