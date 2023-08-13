import { PrismaClient } from "@prisma/client";

import Joi from "joi";
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
