import LoginForm from "@/components/login-form";
import React from "react";

const LoginPage = () => {
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
