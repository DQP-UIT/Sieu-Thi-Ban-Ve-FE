"use client";

import LoginForm from "@/components/login-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      const role = session.user.role?.toString();
      switch (role) {
        case "admin":
          router.push("/admin/");
          break;
        case "receptionist":
          router.push("/receptionist/");
          break;
        default:
          router.push("/designer/");
          break;
      }
      router.refresh();
    }
  }, [status, session, router]);

  if (status === "authenticated") {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <div>Please wait a minute!</div>
      </div>
    );
  }

  // Nếu chưa đăng nhập (unauthenticated), hiển thị form
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay content */}
      <div className="z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
