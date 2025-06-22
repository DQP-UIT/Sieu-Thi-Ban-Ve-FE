"use client";
import { useEffect } from "react";
import { getOrCreateSessionId } from "../lib/session"; // sửa lại path nếu bạn để file khác

export default function SessionInit() {
  useEffect(() => {
    getOrCreateSessionId();
  }, []);
  return null; // không render gì lên UI
}
