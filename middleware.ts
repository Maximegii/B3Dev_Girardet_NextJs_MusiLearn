import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const loginUrl = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
    } else if (req.nextUrl.pathname.startsWith('/dashboard/admin') && token.role !== 'admin') {
        const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);
        return NextResponse.redirect(dashboardUrl); 
    } else if (req.nextUrl.pathname.startsWith('/dashboard/teacher') && token.role !== 'teacher' && token.role !== 'admin') {
        const dashboardUrl = new URL('/dashboard', req.nextUrl.origin); 
        return NextResponse.redirect(dashboardUrl);
    } else if (req.nextUrl.pathname.startsWith('/dashboard/cours') && token.role !== 'student' && token.role !== 'admin') {
        const dashboardUrl = new URL('/dashboard', req.nextUrl.origin);
        return NextResponse.redirect(dashboardUrl);  
    }
 
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/admin/:path*', '/dashboard/teacher/:path*'],
};