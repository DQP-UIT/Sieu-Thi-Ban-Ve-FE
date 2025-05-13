import NextAuth from "next-auth";
import { handlers } from "../../../../../auth";

export const { GET, POST } = handlers;
export const runtime = "edge";
