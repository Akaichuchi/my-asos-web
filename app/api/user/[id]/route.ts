import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    // Tìm user trong Database theo ID
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        fullName: true,
        balance: true, // Chỉ lấy những thông tin cần thiết, bảo mật password
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}