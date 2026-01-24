import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, rating, comment } = body;

    // Lưu bình luận mới vào Database thông qua Prisma
    const newReview = await prisma.review.create({
      data: {
        productId: productId,
        rating: Number(rating),
        comment: comment,
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json({ error: "Không thể lưu bình luận" }, { status: 500 });
  }
}