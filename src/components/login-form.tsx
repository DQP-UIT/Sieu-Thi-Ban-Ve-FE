"use client";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type LoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   if (status === "authenticated" && session) {
  //     const role = session.user.role?.toString();
  //     switch (role) {
  //       case "admin":
  //         router.push("/admin/");
  //         break;
  //       case "receptionist":
  //         router.push("/receptionist/");
  //         break;
  //       default:
  //         router.push("/designer/");
  //         break;
  //     }
  //   }
  // }, [status, session, router]);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setLoading(false);
        await Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Tài khoản hoặc mật khẩu chưa chính xác!",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      } else {
        if (session) setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

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
