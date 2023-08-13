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
  const { postId } = body;

  console.log(postId);

  const deletePost = await prisma.blogPost.delete({
    where: {
      id: postId,
    },
  });

  if (!deletePost) {
    return new NextResponse("Something went wrong", { status: 400 });
  }

  return new NextResponse(JSON.stringify({ message: "Post was deleted" }), {
    status: 200,
  });
}
