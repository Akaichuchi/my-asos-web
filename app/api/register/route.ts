import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API Endpoint: Quản lý thông tin người dùng (User Management)
 * Tối ưu hóa: Khớp với Schema Username/Password mới
 */

// LỆNH LẤY DỮ LIỆU (GET): Phục vụ trang quản trị Admin
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' } // Đưa người dùng mới nhất lên đầu danh sách
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Hệ thống không thể lấy dữ liệu người dùng' }, 
      { status: 500 }
    );
  }
}

// LỆNH ĐĂNG KÝ (POST): Xử lý tạo tài khoản mới với Username
export async function POST(req: Request) {
  try {
    // 1. Giải nén dữ liệu từ Request (Khớp với form Đăng ký của bạn)
    const { username, password } = await req.json();

    // 2. Thực thi tạo mới người dùng trong Database qua Prisma
    const newUser = await prisma.user.create({
      data: { 
        username: username, // Thay thế email bằng username
        password: password, // Thêm trường password đã khai báo trong Schema
        balance: 0.0,       // GIỮ NGUYÊN: Khởi tạo số dư 0đ
        role: 'USER'        // GIỮ NGUYÊN: Phân quyền mặc định là khách hàng
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    // Log lỗi chi tiết để kiểm tra nếu trùng tên người dùng
    console.error("Lỗi đăng ký người dùng:", error);
    
    return NextResponse.json(
      { error: 'Đăng ký thất bại. Tên người dùng có thể đã tồn tại.' }, 
      { status: 500 }
    );
  }
}