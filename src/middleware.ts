import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if (request.nextUrl.pathname === '/') {
    const accessToken = request.cookies.get('accessToken')?.value;
    const userId = request.cookies.get('userId')?.value;

    if (!accessToken) {
      return NextResponse.next();
    }

    const res = await fetch(`${process.env.API_URL}/user/info/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      return NextResponse.next();
    } else {
      console.error('Authentication error');
      let response = NextResponse.next();
      response.cookies.delete('accessToken');
      response.cookies.delete('userId');
      return response;
    }
  }

  if (
    request.nextUrl.pathname === '/mypage' ||
    request.nextUrl.pathname.startsWith('/application') ||
    request.nextUrl.pathname.startsWith('/application2')
  ) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const userId = request.cookies.get('userId')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const res = await fetch(`${process.env.API_URL}/user/info/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      return NextResponse.next();
    } else {
      console.error('Authentication error');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
}
// export { default } from "next-auth/middleware";

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: ['/mypage', '/', '/application/:path*', '/application2/:path*'],
};
