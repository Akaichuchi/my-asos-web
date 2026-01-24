import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // 1. Gọi biến môi trường trực tiếp bên trong hàm POST 
    // Điều này ép Vercel lấy giá trị mới nhất bạn vừa dán vào Settings
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Kiểm tra cấu hình để báo lỗi chính xác trên giao diện
    if (!supabaseUrl || !supabaseKey) {
      console.error("Thiếu cấu hình Supabase URL hoặc Key trên Vercel");
      // Trả về lỗi chi tiết để bạn biết chính xác biến nào đang bị undefined
      throw new Error(`Cấu hình chưa hoàn tất: ${!supabaseUrl ? 'Thiếu URL' : ''} ${!supabaseKey ? 'Thiếu Key' : ''}`);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    
    // Ép kiểu để tính toán chính xác
    const userId = Number(body.userId);
    const totalAmount = Number(body.totalAmount);

    // 1. Kiểm tra số dư hiện tại của người dùng
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("balance")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      throw new Error("Người dùng không tồn tại trên hệ thống");
    }

    // So sánh số dư thực tế
    if (Number(user.balance) < totalAmount) {
      throw new Error(`Số dư không đủ. Bạn có $${user.balance} nhưng cần $${totalAmount}`);
    }

    // 2. Thực hiện trừ tiền
    const newBalance = Number(user.balance) - totalAmount;
    const { error: updateError } = await supabase
      .from("User")
      .update({ balance: newBalance })
      .eq("id", userId);

    if (updateError) {
      throw new Error("Lỗi hệ thống khi trừ tiền, vui lòng thử lại");
    }

    // 3. Tạo bản ghi đơn hàng mới vào bảng Order
    const { data: result, error: orderError } = await supabase
      .from("Order")
      .insert([
        { 
          userId: userId, 
          amount: totalAmount, 
          status: "SUCCESS" 
        }
      ])
      .select()
      .single();

    if (orderError) {
      // Nếu lỗi tạo đơn sau khi đã trừ tiền, cần log lại để Admin kiểm tra
      console.error("Critical error: Money deducted but order failed", orderError);
      throw new Error("Tiền đã trừ nhưng không thể tạo đơn hàng, hãy báo cho Admin!");
    }

    // Trả về phản hồi thành công để Frontend hiện Modal 2 nút
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