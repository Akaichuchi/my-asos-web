import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ép kiểu userId và totalAmount về số để đảm bảo tính toán chính xác
    const userId = Number(body.userId);
    const totalAmount = Number(body.totalAmount);

    // 1. Kiểm tra sự tồn tại của User và số dư hiện tại từ Database thực tế
    // Sử dụng findFirst để đôi khi bỏ qua các lỗi cache của findUnique
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Người dùng không tồn tại trên hệ thống");
    }

    // So sánh số dư: Ép kiểu Number cho user.balance để chắc chắn không so sánh nhầm String
    if (Number(user.balance) < totalAmount) {
      throw new Error(`Số dư không đủ. Bạn có $${user.balance} nhưng cần $${totalAmount}`);
    }

    // 2. Thực hiện trừ tiền trực tiếp vào cột balance trong bảng User
    // Chúng ta sử dụng await đơn lẻ để đảm bảo lệnh này hoàn tất 100% trước khi tạo đơn
    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: totalAmount }
      },
    });

    // 3. Tạo bản ghi đơn hàng mới vào bảng Order
    const result = await prisma.order.create({
      data: {
        userId: userId,
        amount: totalAmount,
        status: "SUCCESS",
      },
    });

    // Trả về phản hồi thành công để Frontend kích hoạt Modal thông báo 2 nút
    return NextResponse.json({ 
      success: true, 
      message: "Thanh toán thành công", 
      data: result 
    });

  } catch (error: any) {
    // Log lỗi ra console của Vercel để dễ dàng theo dõi chi tiết nếu còn lỗi kết nối
    console.error("Payment API Error:", error.message);
    
    // Trả về lỗi để Frontend hiển thị Alert cảnh báo người dùng
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}