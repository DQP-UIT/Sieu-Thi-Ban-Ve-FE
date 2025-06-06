import { User } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface avatarProps {
  user: User;
}
const Avatar: React.FC<avatarProps> = ({ user }) => {
  const router = useRouter();
  const handleOnClick = () => {
    if (user.role !== "user") {
      router.push(`/${user.role}/profile`);
    } else {
      router.push("/designer/profile");
    }
  };
  return (
    <div>
      <div className="avatar" onClick={handleOnClick}>
        <div className="w-16 rounded-full hover:cursor-pointer hover:ring hover:ring-primary hover:ring-offset-base-100 hover:ring-offset-2">
          <Image
            src={
              user.avatar ??
              "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            }
            alt="Avatar"
            width={84}
            height={84}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
