import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// API ĐĂNG NHẬP: Đã cập nhật theo cấu trúc Username/Password mới
export async function POST(request: Request) {
  try {
    // 1. Nhận username và password từ LoginPage gửi lên
    const { username, password } = await request.json();

    // 2. Tìm kiếm người dùng trong Database dựa trên username
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      // 3. Kiểm tra mật khẩu (So sánh trực tiếp để khớp với logic hiện tại của bạn)
      if (user.password === password) {
        // Nếu khớp cả username và password, trả về thành công
        return NextResponse.json(
          { message: 'Đăng nhập thành công', user: { username: user.username, role: user.role } }, 
          { status: 200 }
        );
      } else {
        // Nếu sai mật khẩu
        return NextResponse.json(
          { error: 'Mật khẩu không chính xác!' }, 
          { status: 401 }
        );
      }
    } else {
      // Nếu không tìm thấy tên người dùng
      return NextResponse.json(
        { error: 'Tài khoản không tồn tại!' }, 
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Lỗi API Login:", error);
    return NextResponse.json(
      { error: 'Lỗi kết nối máy chủ' }, 
      { status: 500 }
    );
  }
}