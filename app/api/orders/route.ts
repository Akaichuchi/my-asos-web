import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Đảm bảo ép kiểu dữ liệu từ body để tránh lỗi TypeScript
    const userId = Number(body.userId);
    const totalAmount = Number(body.totalAmount);

    if (isNaN(userId) || isNaN(totalAmount)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra tiền
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) throw new Error("Người dùng không tồn tại");
      
      // Kiểm tra balance (đảm bảo balance được định nghĩa là Float/Int trong schema)
      if (user.balance < totalAmount) {
        throw new Error("Tài khoản không đủ tiền!");
      }

      // 2. Trừ tiền trực tiếp vào Database
      await tx.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: totalAmount }
        },
      });

      // 3. Tạo đơn hàng (Sử dụng tx.order hoặc tx.Order)
      // Nếu tx.order vẫn đỏ, hãy thử đổi thành tx.Order (viết hoa)
      return await tx.order.create({
        data: {
          userId: userId,
          amount: totalAmount,
          status: "SUCCESS",
        },
      });
    });

    return NextResponse.json({ message: "Thanh toán thành công", data: result });
  } catch (error: any) {
    console.error("Lỗi API Order:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}