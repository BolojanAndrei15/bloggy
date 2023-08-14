import { PrismaClient } from "@prisma/client";

import Joi from "joi";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const posts = await prisma.blogPost.findMany();

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

  posts.forEach((post) => {
    const createdAtDate = new Date(post.createdAt);
    const updatedAtDate = new Date(post.updatedAt);
    const formattedUpdateTime = formatDateTime(updatedAtDate);
    const formattedDateTime = formatDateTime(createdAtDate);
    post.updatedAt = `Last edited: ${formattedUpdateTime}`;
    post.createdAt = `Created at: ${formattedDateTime}`;
  });

  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req, res) {
  const blogPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    categoryId: Joi.string().optional(),
    tags: Joi.array().items(Joi.string().max(20)).optional(),
    authorName: Joi.string().optional(),
    authorId: Joi.string().required(),
  });

  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  const body = await req.json();

  if (!body) {
    return new NextResponse("Inputs should not be empty", {
      status: 404,
    });
  }

  const {
    title,
    description,
    categoryId,
    tags,
    content,
    image,
    authorName,
    authorId,
  } = body;

  const { error } = blogPostSchema.validate(body);
  console.log(req.body);
  console.log(error);

  if (error) {
    return new NextResponse(error, {
      status: 404,
    });
  }

  const createPost = await prisma.blogPost.create({
    data: {
      title,
      description,
      category: {
        connect: { id: categoryId },
      },
      tags,
      content,
      image,
      authorName,
      author: {
        connect: { id: authorId },
      },
    },
  });

  if (!createPost) {
    return new NextResponse("Something went wrong", { status: 400 });
  }

  return NextResponse.json(createPost);
}
