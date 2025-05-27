import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    fullName: string;
    role: string;
    address?: string;
    phonenumber?: string;
    avatar?: string;
    designs?: string;
    accessToken: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    address?: string;
    phonenumber?: string;
    avatar?: string;
    designs?: string;
    accessToken: string;
  }

  interface Session {
    user: User;
    accessToken: string; 
  }
}
