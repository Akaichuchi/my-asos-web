import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // CÁCH FIX CUỐI CÙNG: Định nghĩa một đối tượng query thuần túy
    const query: any = {
      include: { reviews: true },
      orderBy: { id: 'desc' }
    };

    // Nếu có category thì mới thêm vào điều kiện lọc
    if (category) {
      query.where = { category: category };
    }

    // Truy vấn bằng đối tượng query đã nới lỏng kiểu dữ liệu
    const products = await prisma.product.findMany(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Lỗi GET API:", error);
    return NextResponse.json({ error: "Lỗi tải dữ liệu" }, { status: 500 });
  }
}

// --- GIỮ NGUYÊN 100% CÁC HÀM POST, PUT, DELETE BÊN DƯỚI CỦA BẠN ---
export async function POST(request: Request) {
  try {
    const body: any = await request.json(); 
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        originalPrice: body.originalPrice,
        images: body.images,
        category: body.category,
        tag: body.tag || "SELLING FAST",
        sizeFit: body.sizeFit,
        details: body.details,
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi đăng sản phẩm" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: any = await request.json();
    const { id, ...updateData } = body; 
    if (!id) return NextResponse.json({ error: "Thiếu ID sản phẩm" }, { status: 400 });

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: updateData.name,
        price: updateData.price,
        originalPrice: updateData.originalPrice,
        images: updateData.images,
        category: updateData.category,
        tag: updateData.tag,
        sizeFit: updateData.sizeFit,
        details: updateData.details,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Không thể cập nhật sản phẩm" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Thiếu ID" }, { status: 400 });
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Đã xóa" });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xóa sản phẩm" }, { status: 500 });
  }
}