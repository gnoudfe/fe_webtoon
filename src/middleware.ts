import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("refreshToken")?.value;
  console.log(cookie);
}
export const config = {
  matcher: '/desired-route',
}