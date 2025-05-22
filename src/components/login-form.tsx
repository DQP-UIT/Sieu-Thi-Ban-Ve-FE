"use client";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log("session", session);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        return;
      } else {
        console.log("data", session?.user);
        switch (session?.user.role) {
          case "admin":
            router.push("/admin");
            break;
          case "receiptionist":
            router.push("/receptionist");
            break;
          default:
            router.push("/designer");
            break;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content w-full md:max-w-1/2 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Welcome to DesignsRepo! Access your personalized dashboard to
              manage blueprints, customer interactions, and system resources
              based on your role. We're glad to have you as part of our team
              creating exceptional home design experiences.
            </p>
          </div>
          <div className="card bg-gradient-to-br from-gray-300/30 to-gray-600/30 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    {...form.register("email")}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <input
                    {...form.register("password")}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button
                    className="btn btn-soft btn-primary mt-4"
                    type="submit"
                  >
                    Login
                  </button>
                  <div className="divider">OR</div>
                  <button
                    className="btn btn-soft btn-secondary"
                    type="button"
                    onClick={() => signIn("google")}
                  >
                    Login with Google
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
