import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/posts(.*)",
  "/users(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(req) && !userId) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // redirect to previous path if available or to dashboard
  if (pathname === "/" && userId) {
    const cookies = req.cookies;
    const previousPath = cookies.get("previousPath")?.value;

    if (previousPath && previousPath !== "/") {
      return NextResponse.redirect(new URL(previousPath, req.url));
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
