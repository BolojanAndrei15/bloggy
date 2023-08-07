import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const data = await prisma.blogPost.findMany();
  const posts = JSON.stringify(data);

  return new NextResponse(posts, { status: 200 });
}
