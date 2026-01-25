import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * API Endpoint: Quản lý thông tin người dùng (User Management)
 * Tối ưu hóa: Khớp với Schema Username/Password mới
 */

// LỆNH LẤY DỮ LIỆU (GET): Phục vụ trang quản trị Admin
export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('User') 
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
    const { username, password } = await req.json();

    const { data: newUser, error } = await supabase
      .from('User')
      .insert([
        { 
          username: username, 
          password: password, 
          balance: 0.0,      
          role: 'USER'       
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Lỗi đăng ký người dùng:", error);
    
    return NextResponse.json(
      { error: 'Đăng ký thất bại. Tên người dùng có thể đã tồn tại.' }, 
      { status: 500 }
    );
  }
}

// LỆNH CẬP NHẬT (PUT): Xử lý cộng/trừ tiền VÀ đổi mật khẩu từ Admin Dashboard
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, balance, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID người dùng' }, { status: 400 });
    }

    // TỐI ƯU HÓA: Tạo object cập nhật linh hoạt cho cả balance và password
    const updateFields: any = {};
    if (balance !== undefined) updateFields.balance = parseFloat(balance);
    if (password !== undefined) updateFields.password = password;

    const { data: updatedUser, error } = await supabase
      .from('User')
      .update(updateFields) // Cập nhật các trường có trong object
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    return NextResponse.json(
      { error: 'Không thể cập nhật thông tin khách hàng' }, 
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