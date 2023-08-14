import { NextResponse } from "next/server";
import { prisma } from "../prismaClient";

export async function GET(req) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  const category = await prisma.category.findMany();

  if (!category) {
    return new NextResponse("No cateogry found", { status: 404 });
  }

  return NextResponse.json(category);
}
