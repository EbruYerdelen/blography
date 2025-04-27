import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const isAuthenticated = await verifyTokenByDecoding(token);

  if (AUTH_ROUTES.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

async function verifyTokenByDecoding(token?: string): Promise<boolean> {
  if (!token) return false;

  try {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) return false;

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    const payload = decoded.payload as jwt.JwtPayload;

    if (payload.exp && payload.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return false;
  }
}
