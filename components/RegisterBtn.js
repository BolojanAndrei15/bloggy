import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterBtn() {
  return (
    <div className="flex justify-between items-center w-44">
      <Link href={"/login"}>
        <Button variant="ghost" className="w-30">
          Log in
        </Button>
      </Link>
      <Link href={"/register"}>
        <Button>Sign up</Button>
      </Link>
    </div>
  );
}
