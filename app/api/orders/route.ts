import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, totalAmount } = body;

    // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu
    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra sự tồn tại của User và số dư hiện tại
      const user = await tx.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!user) {
        throw new Error("Người dùng không tồn tại trên hệ thống");
      }

      if (user.balance < totalAmount) {
        throw new Error("Số dư tài khoản không đủ để thực hiện thanh toán");
      }

      // 2. Thực hiện trừ tiền trực tiếp vào cột balance trong bảng User
      await tx.user.update({
        where: { id: Number(userId) },
        data: {
          balance: { decrement: totalAmount }
        },
      });

      // 3. Tạo bản ghi đơn hàng mới vào bảng Order (đã khớp tên bảng bạn vừa đổi)
      return await tx.order.create({
        data: {
          userId: Number(userId),
          amount: totalAmount,
          status: "SUCCESS",
        },
      });
    });

    // Trả về phản hồi thành công để Frontend hiển thị Modal 2 nút
    return NextResponse.json({ 
      success: true, 
      message: "Thanh toán thành công", 
      data: result 
    });

  } catch (error: any) {
    // Trả về lỗi để Frontend hiển thị Alert (ví dụ: "SỐ DƯ KHÔNG ĐỦ")
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}