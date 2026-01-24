import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tải dữ liệu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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