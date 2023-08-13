import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const body = await req.json();

  if (!body) {
    return new NextResponse("Body should not be empty", { status: 404 });
  }

  const { postId, title, description, categoryId, tags, content, image } = body;

  const editPost = await prisma.blogPost.update({
    where: { id: postId },
    data: {
      title,
      description,
      category: {
        connect: { id: categoryId },
      },
      tags,
      content,
      image,
    },
  });

  if (!editPost) {
    return new NextResponse("Something went wrong", { status: 400 });
  }

  return NextResponse.json(editPost);
}
