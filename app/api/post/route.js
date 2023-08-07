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

  const createdAtDate = new Date(post.createdAt);
  const currentDate = new Date();
  const timeDifferenceInMinutes = Math.round(
    (currentDate - createdAtDate) / (1000 * 60)
  );

  if (timeDifferenceInMinutes >= 60) {
    // Calculate the time difference in hours
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    return NextResponse.json({
      ...post,
      createdAt: `${timeDifferenceInHours} hours ago`,
    });
  } else {
    return NextResponse.json({
      ...post,
      createdAt: `${timeDifferenceInMinutes} minutes ago`,
    });
  }
}
