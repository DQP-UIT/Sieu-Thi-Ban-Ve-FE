import Header from "@/components/header";
import HomePage from "./home/page";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect('/customer')
  );
}
