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
import axios from "axios";
import { useRouter } from "next/navigation";

const usernameSchema = Joi.string()
  .min(6)
  .max(12)
  .alphanum()
  .required()
  .label("Username");

const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "io"] },
  })
  .label("Email");
const passwordSchema = Joi.string().min(6).required().label("Password");

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, showPass] = useState(false);

  const handleRegistration = async () => {
    if (username == true && email == true && password == true) {
      const response = await axios
        .post("http://localhost:3000/api/register", {
          username: input.username,
          email: input.email,
          password: input.password,
        })
        .then(() => {
          toast({
            vairants: "succes",
            title: "User has been created",
            description: `Please enter your credentials to log in`,
          });
          router.push("/login");
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Ups, something went wrong",
            description: `${err.request.response}`,
          });
        });
    } else {
      toast({
        variant: "destructive",
        title: "Ups... You have to enter some data",
        description: "For registration, you shall add all the data required",
      });
    }
  };

  useEffect(() => {
    const validateUsername = usernameSchema.validate(input.username);
    const { valid, error } = validateUsername;

    if (error) {
      if (error.details[0].path) {
        setUsername(error.message);
      }
    } else {
      setUsername(true);
    }
  }, [input.username]);

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
                value={input.username}
                className={`${
                  username != true ? "border-red-500" : "border-green-500"
                } `}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                type="text"
                placeholder="Enter your username..."
              />
              {username !== "" ? (
                <Label className="text-[0.8rem] text-red-500">{username}</Label>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Email:</Label>
              <Input
                value={input.email}
                className={`${
                  email != true ? "border-red-500" : "border-green-500"
                } `}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                type="email"
                placeholder="Enter your email adress..."
              />
              {email !== "" ? (
                <Label className="text-[0.8rem] text-red-500">{email}</Label>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Password:</Label>
              <Input
                value={input.password}
                className={`${
                  password != true ? "border-red-500" : "border-green-500"
                } `}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                type={pass ? "text" : "password"}
                placeholder="Enter your password..."
              />
              {password !== "" ? (
                <Label className="text-[0.8rem] text-red-500">{password}</Label>
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
                Register now
              </Button>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-slate-500 ">
                Already have an account?
                <Link
                  className="text-slate-900 font-semibold ml-1"
                  href={"/login"}
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
