import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useUserContext } from '@/Context/userContext'; // Adjust the path to your UserContext

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the request is for an admin route
    if (pathname.startsWith('/admin')) {
        const userContext = useUserContext();

        // Check if the user has the admin role
        if (userContext?.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};