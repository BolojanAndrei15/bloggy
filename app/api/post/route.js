import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  const body = await req.json();

  if (!body) {
    return new NextResponse("Body should not be empty", { status: 404 });
  }
  const post = await prisma.blogPost.findUnique({
    where: {
      id: body.postId,
    },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }
  function formatDateTime(date) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  }

  const createdAtDate = new Date(post.createdAt);
  const formattedDateTime = formatDateTime(createdAtDate);

  return NextResponse.json({
    ...post,
    createdAt: ` ${formattedDateTime}`,
  });
}
