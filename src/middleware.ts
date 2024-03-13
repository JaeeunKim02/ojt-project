import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios';

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if (request.url.includes("/mypage")){
    const accessToken = request.cookies.get('accessToken')?.value; 
    const userId = request.cookies.get('userId')?.value; 
    console.log(accessToken);
    console.log(userId);
    if(!accessToken) {
      console.log(1);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const res =await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
      method: 'GET',
      headers:{
          Authorization: `Bearer ${accessToken}`,
      },
      
    });
    if(res.ok){ 
      console.log(2);
      return NextResponse.next()
    }
    else {
      console.log(3);
      console.error('Authentication error');
      console.log(accessToken);
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  } 
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: '/mypage/:path*',
}
