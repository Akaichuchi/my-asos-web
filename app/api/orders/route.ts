import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase Client để thay thế Prisma nhằm tránh lỗi kết nối 08P01
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ép kiểu userId và totalAmount về số để đảm bảo tính toán chính xác
    const userId = Number(body.userId);
    const totalAmount = Number(body.totalAmount);

    // 1. Kiểm tra sự tồn tại của User và số dư hiện tại từ Database thực tế
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("balance")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      throw new Error("Người dùng không tồn tại trên hệ thống");
    }

    // So sánh số dư
    if (Number(user.balance) < totalAmount) {
      throw new Error(`Số dư không đủ. Bạn có $${user.balance} nhưng cần $${totalAmount}`);
    }

    // 2. Thực hiện trừ tiền trực tiếp vào cột balance trong bảng User
    const { error: updateError } = await supabase
      .from("User")
      .update({ balance: Number(user.balance) - totalAmount })
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
      throw new Error("Tiền đã trừ nhưng không thể tạo đơn hàng, hãy báo cho Admin!");
    }

    // Trả về phản hồi thành công để Frontend kích hoạt Modal thông báo 2 nút
    return NextResponse.json({ 
      success: true, 
      message: "Thanh toán thành công", 
      data: result 
    });

  } catch (error: any) {
    // Log lỗi ra console để theo dõi chi tiết
    console.error("Payment API Error:", error.message);
    
    // Trả về lỗi để Frontend hiển thị Alert cảnh báo người dùng
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}