import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //console.log("token:", token)

  const pathname = req.nextUrl.pathname; 
  // console.log("pathname:", pathname)

  // console.log("Cookies:", req.cookies.getAll());
  // console.log("Token:", token);
  // console.log("URL:", req.nextUrl.pathname);


  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", '/dashboard'],
};
