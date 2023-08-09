import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const posts = await prisma.blogPost.findMany();

  function getTimeDifference(createdAtDate, currentDate) {
    const timeDifferenceInMinutes = Math.round(
      (currentDate - createdAtDate) / (1000 * 60)
    );

    if (timeDifferenceInMinutes < 1) {
      return "just now";
    } else if (timeDifferenceInMinutes >= 60) {
      const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
      return `${timeDifferenceInHours} hours ago`;
    } else {
      return `${timeDifferenceInMinutes} minutes ago`;
    }
  }
  const currentDate = new Date();
  posts.forEach((post) => {
    const createdAtDate = new Date(post.createdAt);
    const timeDifferenceString = getTimeDifference(createdAtDate, currentDate);
    post.createdAt = timeDifferenceString;
  });

  return NextResponse.json(posts, { status: 200 });
}
