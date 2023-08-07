import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const posts = await prisma.blogPost.findMany();

  return NextResponse.json(posts, { status: 200 });
}
