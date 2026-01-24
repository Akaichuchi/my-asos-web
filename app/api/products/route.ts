import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({ 
      include: { reviews: true }, 
      orderBy: { id: 'desc' } 
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tải dữ liệu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // SỬA TẠI ĐÂY: Thêm ": any" để TypeScript không báo lỗi đỏ
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
    console.error("Lỗi POST:", error);
    return NextResponse.json({ error: "Lỗi đăng sản phẩm" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // SỬA TẠI ĐÂY: Thêm ": any" để bóc tách dữ liệu mượt mà
    const body: any = await request.json();
    const { id, ...updateData } = body; 

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID sản phẩm" }, { status: 400 });
    }

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
    console.error("Lỗi API PUT:", error);
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