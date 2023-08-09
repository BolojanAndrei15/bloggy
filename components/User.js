"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePlus, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

function User() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center space-x-2">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-md">
            {status == "authenticated" ? session.user.name : "username"}
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[10rem]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/create")}
            className="flex justify-between cursor-pointer"
          >
            Add post
            <FilePlus className="w-5 h-5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex justify-between cursor-pointer"
          >
            Sign Out
            <LogOut className="w-5 h-5 text-red-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default User;
