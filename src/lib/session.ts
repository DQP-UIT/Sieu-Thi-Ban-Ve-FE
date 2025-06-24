import axios from "axios";

/**
 * Lấy hoặc tạo session_id mới (chỉ gọi lên BE nếu localStorage chưa có)
 */
export async function getOrCreateSessionId(): Promise<string> {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const res = await axios.post(`${apiUrl}/session/create`);
    sessionId = res.data.session_id;
    localStorage.setItem("session_id", sessionId);
  }
  return sessionId;
}
