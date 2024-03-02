import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const isUnAuthed = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password", "/auth/reset-password"];
const isAuthed = ["/profile/settings/security", "/profile/settings", "/recipe/favorites", "/recipe/add"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if(token) {
    if(isUnAuthed.some((el: string) => request.nextUrl.pathname.includes(el))) {
      return NextResponse.redirect(new URL("/profile/settings", request.url));
    }
  } else {
    if(isAuthed.some((el: string) => request.nextUrl.pathname.includes(el)) || request.nextUrl.pathname === "/profile") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl.origin));
    }
  }
}