import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, totalAmount } = body;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra tiền
      const user = await tx.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!user || user.balance < totalAmount) {
        throw new Error("Số dư không đủ hoặc User không tồn tại");
      }

      // 2. Lệnh trừ tiền trong bảng User
      await tx.user.update({
        where: { id: Number(userId) },
        data: {
          balance: { decrement: totalAmount }
        },
      });

      // 3. Tạo đơn hàng (Bây giờ sẽ không còn đỏ nữa)
      return await tx.order.create({
        data: {
          userId: Number(userId),
          amount: totalAmount,
          status: "SUCCESS",
        },
      });
    });

    return NextResponse.json({ message: "Thanh toán thành công", data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}