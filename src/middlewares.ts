import { auth } from "./auth";

export default auth((req) => {
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

  // Cho phép toàn bộ /api/auth/*
  if (isAuthRoute) {
    return;
  }

  // Chỉ check auth cho các API routes khác
  if (isApiRoute && !req.auth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
});

// Optionally, configure which routes to protect
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
