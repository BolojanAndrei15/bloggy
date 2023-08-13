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

  try {
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

    return NextResponse.json(editPost);
  } catch (error) {
    return new NextResponse(
      "Something went wrong when tring to update the blogpost, verify if every input has a value",
      { status: 404 }
    );
  }
}
