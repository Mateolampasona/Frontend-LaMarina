import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const tokenCookie = req.cookies.get('accessToken');
    const token = tokenCookie ? tokenCookie.value : null;
    const parsedToken = JSON.parse(token || 'null');
    if (pathname.startsWith('/admin')) {
        try {
            const decodedToken = parsedToken ? jwt.decode(parsedToken) : null;
            const role = (decodedToken && typeof decodedToken !== 'string') ? decodedToken.role : null;
            if (role !== 'admin') {
                return NextResponse.redirect(new URL('/unauthorized', req.url));
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};