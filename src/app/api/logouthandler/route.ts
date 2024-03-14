// import type { NextApiRequest, NextApiResponse } from 'next'
import {redirect} from 'next/navigation'
export async function POST() {

    let headers = new Headers();
    headers.append('Set-Cookie', 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    headers.append('Set-Cookie', 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    headers.append('Set-Cookie', 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    headers.append('Content-Type', 'application/json');

    // redirect('/')
    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: headers
    })
    // redirect('/')

  
    // 리다이렉션 Response 객체 생성
    // res.redirect('/', req.url); // 302는 임시 리다이렉션을 의미합니다.
    
    // if (req.method === 'POST') {
    //     // 쿠키 삭제
    //     res.setHeader('Set-Cookie', [
    //       'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
    //       'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
    //       'isLoggedIn=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
    //     ]);
    //     // 클라이언트를 홈으로 리다이렉트
    //     res.redirect('/');
    //   } 

  }
  