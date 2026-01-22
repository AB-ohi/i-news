import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Protected routes
  const isAdminRoute = path.startsWith('/admin');
  const isCMSRoute = path.startsWith('/cms');
  const isLoginPage = path === '/admin/login';
  
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  
  // Admin login page - only admin can access
  if (isAdminRoute && !isLoginPage) {
    if (!token || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }
  
  // CMS - admin, editor, manager can access
  if (isCMSRoute) {
    if (!token || !['admin', 'editor', 'manager'].includes(userRole || '')) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }
  
  // Regular users trying to access protected routes
  if ((isAdminRoute || isCMSRoute) && userRole === 'user') {
    return NextResponse.redirect(new URL('/404', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/cms/:path*']
};

