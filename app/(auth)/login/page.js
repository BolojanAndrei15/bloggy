import LoginForm from "@/components/ui/login/LoginForm";
import React from "react";

export default function Login() {
  return (
    <div className="h-[100vh] flex justify-center bg-slate-50">
      <div className="mx-auto flex items-center">
        <LoginForm />
      </div>
    </div>
  );
}
