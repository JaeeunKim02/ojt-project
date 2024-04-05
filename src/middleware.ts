import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fetchAPI from './api/api';

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if (request.nextUrl.pathname === '/') {
    console.log('middleware "/" called');
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.next();
    }

    const res = await fetchAPI.get(`/auth/validate`, `${accessToken}`);
    if (res.ok) {
      console.log('middleware "/" is done');
      return NextResponse.next();
    } else {
      console.error('Authentication error');
      const response = NextResponse.next();
      response.cookies.delete('accessToken');
      response.cookies.delete('userId');
      response.cookies.delete('permission');
      return response;
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/mypage') ||
    request.nextUrl.pathname.startsWith('/userList') ||
    request.nextUrl.pathname.startsWith('/application')
  ) {
    const accessToken = request.cookies.get('accessToken')?.value;
    console.log('middleware "/mypage" called');
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const res = await fetchAPI.get(`/auth/validate`, `${accessToken}`);
    if (res.ok) {
      if (request.nextUrl.pathname === '/userList') {
        const user = await res.json();
        if (user.permission === 'guest') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
      return NextResponse.next();
    } else {
      console.error('Authentication error');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: ['/mypage/:path*', '/', '/userList/:path*', '/application/:path*'],
};
