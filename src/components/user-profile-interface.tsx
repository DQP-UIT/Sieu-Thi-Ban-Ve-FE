"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-base-100 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user?.avatar ? (
              <Image src={user.avatar} alt="Avatar" width={96} height={96} />
            ) : (
              <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center text-4xl font-bold">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.fullName}</h2>
          <p className="text-sm opacity-70">{user?.email}</p>
          <div className="badge badge-primary mt-1">{user?.role}</div>
        </div>
      </div>

      <div className="divider" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Địa chỉ:</span>
          <span>{user?.address || "Chưa cập nhật"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Số điện thoại:</span>
          <span>{user?.phonenumber || "Chưa cập nhật"}</span>
        </div>

        {user?.role === "user" && (
          <div className="flex justify-between">
            <span className="font-semibold">Số bản thiết kế:</span>
            <span>{user.designs ?? "0"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
