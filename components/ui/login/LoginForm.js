"use client";
import { useToast } from "@/components/ui/use-toast";
import { FaBlogger } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useEffect, useState } from "react";
import Joi from "joi";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "io"] },
  })
  .label("Email");
const passwordSchema = Joi.string().min(6).required().label("Password");

export default function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const router = useRouter();
  const lastPagePath = router.asPath;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, showPass] = useState(false);

  const handleRegistration = async () => {
    if (email == true && password == true) {
      await signIn("credentials", {
        ...input,
        redirect: false,
      })
        .then((res) => {
          if (res.error != null) {
            if (res.error == "User doesn't exist") {
              setEmail(res.error);
            }
            if (res.error == "Incorect password") {
              setPassword(res.error);
            }
            toast({
              variant: "destructive",
              title: `${res.error}`,
              description: `Please enter the credentials again`,
            });
          } else {
            router.push("/");
          }
        })
        .catch((err) => {
          setEmail("");
          setPassword("");
          toast({
            variant: "destructive",
            title: "Ups, something went wrong",
            description: `${err}`,
          });
        });
    } else {
      toast({
        variant: "destructive",
        title: "Ups... You have to enter some data",
        description: "To log in, you shall add all the data required",
      });
    }
  };

  useEffect(() => {
    const validateEmail = emailSchema.validate(input.email);
    const { valid, error } = validateEmail;
    if (error) {
      if (error.details[0].path) {
        setEmail(error.message);
      }
    } else {
      setEmail(true);
    }
  }, [input.email]);

  useEffect(() => {
    const validatePassword = passwordSchema.validate(input.password);
    const { valid, error } = validatePassword;

    if (error) {
      if (error.details[0].path) {
        setPassword(error.message);
      }
    } else {
      setPassword(true);
    }
  }, [input.password]);

  return (
    <div className="w-full sm:w-[30rem]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-[1.2rem] font-bold sm:text-2xl">
            <Link href={"/"}>
              {" "}
              <FaBlogger className="w-16 h-16 mr-2" />
            </Link>
            Log in intro your account
          </CardTitle>
          <CardDescription className="text-sm">
            Welcome back! Please enter your username and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-5">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              <Label>Email:</Label>
              <Input
                className={`${
                  input.email !== ""
                    ? email != true
                      ? "border-red-500"
                      : "border-green-500"
                    : "border"
                } `}
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                type="email"
                placeholder="Enter your email adress..."
              />
              {input.email ? (
                email !== "" ? (
                  <Label className="text-[0.8rem] text-red-500">{email}</Label>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Password:</Label>
              <Input
                className={`${
                  input.password !== ""
                    ? password != true
                      ? "border-red-500"
                      : "border-green-500"
                    : ""
                } `}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                value={input.password}
                type={pass ? "text" : "password"}
                placeholder="Enter your password..."
              />
              {input.password !== "" ? (
                password !== "" ? (
                  <Label className="text-[0.8rem] text-red-500">
                    {password}
                  </Label>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox onClick={() => showPass(!pass)} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <p>Show password</p>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full space-y-5">
            <div className="w-full flex ">
              <Button onClick={handleRegistration} className="w-full">
                Log In
              </Button>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-slate-500 ">
                Do you want an account?
                <Link
                  className="text-slate-900 font-semibold ml-1"
                  href={"/register"}
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
