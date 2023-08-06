import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Joi from "joi";

const prisma = new PrismaClient();

const userSchema = Joi.object({
  username: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export async function POST(req) {
  const body = await req.json();
  const { username, email, password } = body;

  if (!username && !email && !password) {
    return new NextResponse("Missing name, email, or password", {
      status: 400,
    });
  }

  const validation = userSchema.validate(body);

  const { error } = validation;

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  const existEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existEmail) {
    return new NextResponse("User with that email already exists!", {
      status: 400,
    });
  }

  const existUsername = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (existUsername) {
    return new NextResponse("User with that username already exists!", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
