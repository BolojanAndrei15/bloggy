"use client";

import { FaBlogger } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className="w-full sm:w-[30rem]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-[1.2rem] font-bold sm:text-2xl">
            <FaBlogger className="w-16 h-16 mr-2" />
            Register for a Blog Account
          </CardTitle>
          <CardDescription className="text-sm">
            Welcome to our blogging community! To start sharing your thoughts
            and ideas with the world, please fill out the registration form
            below to create your blog account.
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-5">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              <Label>Username:</Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                type="text"
                placeholder="Enter your username..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Email:</Label>
              <Input
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                type="email"
                placeholder="Enter your email adress..."
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Password:</Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                type="text"
                placeholder="Enter your password..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full space-y-5">
            <div className="w-full flex ">
              <Button className="w-full">Register now</Button>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-slate-500 ">
                Already have an account?
                <Link
                  className="text-slate-900 font-semibold ml-1"
                  href={"signin"}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
