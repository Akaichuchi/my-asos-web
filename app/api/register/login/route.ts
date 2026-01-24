import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Tìm kiếm người dùng trong Database dựa trên email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      // Nếu tìm thấy, trả về thành công để LoginPage cho phép đăng nhập
      return NextResponse.json({ message: 'User found', user }, { status: 200 });
    } else {
      // Nếu không thấy, trả về lỗi để LoginPage báo khách hàng cần Đăng ký
      return NextResponse.json({ error: 'Tài khoản không tồn tại!' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi kết nối máy chủ' }, { status: 500 });
  }
}