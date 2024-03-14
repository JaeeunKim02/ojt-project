import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from 'next/headers'
import axios from 'axios';

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if(request.nextUrl.pathname==='/') {
    // const res = await fetch(`/api/loginstatus`)
    // const result = await res.json()
    // const loginStatus=(result.isLoggedIn)
    // console.log(loginStatus)
    // return NextResponse.next().cookies.set('isLoggedIn', loginStatus);

    const isLoggedIn=request.cookies.get('isLoggedIn')?.value;
    const accessToken =request.cookies.get('accessToken')?.value;
    const userId=request.cookies.get('userId')?.value;

    if(!isLoggedIn){
      return NextResponse.next()
    }

    const res =await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
        method: 'GET',
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
      });
      if(res.ok){ 
        // let response= NextResponse.next()
        // response.cookies.set('isLoggedIn', 'true')
        return NextResponse.next()
      }
      else {
        console.error('Authentication error');
        let response= NextResponse.next()
        response.cookies.delete('isLoggedIn')
        return response
      }
  }

  if(request.nextUrl.pathname==='/mypage'){
    const isLoggedIn= request.cookies.get('isLoggedIn')?.value;
    const accessToken = request.cookies.get('accessToken')?.value; 
    const userId = request.cookies.get('userId')?.value; 

    if(!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const res =await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
      method: 'GET',
      headers:{
          Authorization: `Bearer ${accessToken}`,
      },
      
    });
    if(res.ok){ 
      return NextResponse.next()
    }
    else {
      console.error('Authentication error');
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  } 
}
// export { default } from "next-auth/middleware";

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: ['/mypage', '/'],
}
