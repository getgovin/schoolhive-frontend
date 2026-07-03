import { NextResponse } from 'next/server';
import  { NextRequest } from 'next/server';

// Define ONLY the public routes that anyone can access
const publicRoutes = ['/', '/school-admin/login'];

export function middleware(request) {
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  // Check if the current route is in the publicRoutes list
  const isPublicRoute = publicRoutes.includes(pathname);

  // 1. Unauthenticated user trying to access a protected route
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/school-admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated user trying to access login/signup pages -> Redirect to home/dashboard
  const isAuthRoute = [ '/school-admin/login'].includes(pathname);
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/school-admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
