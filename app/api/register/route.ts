import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * API Endpoint: Quản lý thông tin người dùng (User Management)
 * Tối ưu hóa: Khớp với Schema Username/Password mới
 */

// LỆNH LẤY DỮ LIỆU (GET): Phục vụ trang quản trị Admin
export async function GET() {
  try {
    // Chuyển đổi prisma.user.findMany sang supabase.from().select()
    const { data: users, error } = await supabase
      .from('User') // Tên bảng trong Supabase (đảm bảo khớp với DB của bạn)
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

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

    // 2. Thực thi tạo mới người dùng trong Database qua Supabase
    const { data: newUser, error } = await supabase
      .from('User')
      .insert([
        { 
          username: username, 
          password: password, 
          balance: 0.0,      // GIỮ NGUYÊN: Khởi tạo số dư 0đ
          role: 'USER'       // GIỮ NGUYÊN: Phân quyền mặc định là khách hàng
        }
      ])
      .select()
      .single();

    if (error) throw error;

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

// LỆNH CẬP NHẬT (PUT): Xử lý cộng/trừ tiền từ Admin Dashboard
export async function PUT(req: Request) {
  try {
    const { id, balance } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID người dùng' }, { status: 400 });
    }

    // Chuyển đổi prisma.user.update sang supabase.from().update()
    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({
        balance: parseFloat(balance), // Cập nhật số dư mới từ Admin
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Lỗi cập nhật số dư:", error);
    return NextResponse.json(
      { error: 'Không thể cập nhật số dư khách hàng' }, 
      { status: 500 }
    );
  }
}

// LỆNH XÓA (DELETE): Xóa vĩnh viễn khách hàng
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID người dùng' }, { status: 400 });
    }

    // Chuyển đổi prisma.user.delete sang supabase.from().delete()
    const { error } = await supabase
      .from('User')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Đã xóa người dùng thành công' });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    return NextResponse.json(
      { error: 'Lỗi hệ thống khi xóa' }, 
      { status: 500 }
    );
  }
}