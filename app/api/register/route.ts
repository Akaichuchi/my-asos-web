import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// LỆNH LẤY DỮ LIỆU (GET): Giúp trang Admin hiển thị danh sách khách
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' } // Khách mới nhất lên đầu
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lấy dữ liệu' }, { status: 500 });
  }
}

// LỆNH ĐĂNG KÝ (POST): Giữ nguyên logic nạp tiền của bạn
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const newUser = await prisma.user.create({
      data: { email: email, balance: 0.0, role: 'USER' },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi đăng ký' }, { status: 500 });
  }
}