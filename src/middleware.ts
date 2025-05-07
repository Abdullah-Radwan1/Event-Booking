import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that should be blocked for authenticated users
const Paths = ["/auth/signin", "/auth/signup", "/signin", "/signup"];

// Paths that should be accessible without authentication

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is authenticated
  if (session) {
    const shouldRedirect = Paths.includes(pathname);
    if (shouldRedirect) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Optional role-based redirect
    if (session.role === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If user is not authenticated and path is not public, redirect to login
    const isPublic = Paths.some((path) => pathname.startsWith(path));
    if (!isPublic) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
