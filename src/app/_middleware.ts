import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios';
 

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if (request.url.includes("/mypage")){
    const accessToken = request.cookies.get('accessToken');
    const userId = request.cookies.get('userId');
    if(!accessToken) return NextResponse.redirect(new URL("/auth/login", request.url));

    try{
        await axios.get(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return NextResponse.next();
    } catch(error){
        console.error('Authentication error',error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } 
  return NextResponse.next();
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: '/mypage/:path*',
}
