import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;
  const pathname = url.pathname.toLowerCase();


  const commonPaths = [
    "/dashboard/allrole/profile",
    "/dashboard/allrole/settings",
  ];


  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  if (token && pathname.startsWith("/dashboard")) {
    const userRole = (token.role || "").toLowerCase();
    //console.log("userRole token", userRole)

    const allowedPaths = {
      admin: "/dashboard/admin",
      vendor: "/dashboard/vendor",
      rider: "/dashboard/rider",
      customer: "/dashboard/customer",
    };

 
    const isCommonPath = commonPaths.some((path) => pathname.startsWith(path));
    if (isCommonPath) {
      return NextResponse.next();
    }

    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return NextResponse.next();
    }

    const allowedPath = allowedPaths[userRole];
    if (allowedPath) {
      if (!pathname.startsWith(allowedPath)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};



