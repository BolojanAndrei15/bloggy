import { getServerSession } from "next-auth/next";
import { FaBlogger } from "react-icons/fa";

import Link from "next/link";

import RegisterBtn from "./RegisterBtn";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "./User";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 w-full h-16 bg-white flex justify-between pb-6 pt-4 border-b border-slate-100 z-50">
      <Link href="/" className="flex items-center">
        <FaBlogger className="w-10 h-10 sm:w-8 sm:h-8" />
        <h1 className="text-lg font-bold hidden sm:block">Bloggy</h1>
      </Link>
      {!session ? <RegisterBtn /> : <User />}
    </div>
  );
}

export default Navbar;
