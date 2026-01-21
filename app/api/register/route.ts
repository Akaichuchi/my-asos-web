import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Đường dẫn đến file ở Bước 1

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email này đã được đăng ký!" }, { status: 400 });
    }

    // Tạo khách hàng mới vào Database
    const newUser = await prisma.user.create({
      data: {
        email: email,
        balance: 0.0, // Mặc định là 0.0 như trong schema của bạn
        role: "USER"
      },
    });

    return NextResponse.json({ message: "Tạo tài khoản thành công!", user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi hệ thống, vui lòng thử lại!" }, { status: 500 });
  }
}