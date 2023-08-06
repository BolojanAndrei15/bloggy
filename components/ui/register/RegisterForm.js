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

export default function RegisterForm() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <FaBlogger />
            Register for a Blog Account
          </CardTitle>
          <CardDescription>
            Welcome to our blogging community! To start sharing your thoughts
            and ideas with the world, please fill out the registration form
            below to create your blog account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <Label>Username:</Label>
              <Input type="text" placeholder="Enter your username..." />
            </div>
            <div>
              <Label>Email:</Label>
              <Input type="email" placeholder="Enter your email adress..." />
            </div>
            <div>
              <div>
                <Label>Password:</Label>
                <Input type="text" placeholder="Enter your password..." />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div>
            <div>
              <Button>Register now</Button>
            </div>
            <p>
              Already have an account?<Link href={"signin"}>Sign In</Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
