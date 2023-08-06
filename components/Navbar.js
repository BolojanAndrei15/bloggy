"use client";
import { FaBlogger } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import RegisterBtn from "./RegisterBtn";
function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="sticky top-0 w-full h-16 bg-white flex justify-between pb-6 pt-4 border-b border-slate-100 z-50">
      <Link href="/" className="flex items-center">
        <FaBlogger className="w-10 h-10 sm:w-8 sm:h-8" />
        <h1 className="text-lg font-bold hidden sm:block">Bloggy</h1>
      </Link>

      {status == "loading" ? (
        <RegisterBtn />
      ) : status == "unauthenticated" ? (
        <RegisterBtn />
      ) : (
        <div className="flex justify-center items-center space-x-2">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-md">{session.user.name}</h1>
        </div>
      )}
    </div>
  );
}

export default Navbar;
