import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios';
 

export async function middleware(request: NextRequest) {
  // 리다이렉트 조건
  if (request.url.includes("/mypage")){
    const accessToken = request.cookies.get('accessToken'); // 객체 타입임
    const userId = request.cookies.get('userId'); //객체 타입이므로 userId.value 해야 값 얻을수 있다.
    console.log(accessToken);
    console.log(userId);
    if(!accessToken) {
      console.log(1);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // try{
    //     await axios.get(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
    //         headers:{
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     return NextResponse.next();
    // } catch(error){
    //     console.error('Authentication error',error);
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }
    const res =await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId.value}`, {
      method: 'GET',
      headers:{
          Authorization: `Bearer ${accessToken.value}`,
      },
      
    });
    if(res.ok){ 
      console.log(2);
      return NextResponse.next()
    }
    else {
      console.log(3);
      console.error('Authentication error');
      console.log(accessToken.value);
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  } 
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: '/mypage/:path*',
}
