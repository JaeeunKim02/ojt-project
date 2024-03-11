// 'use client'; 

import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
// import {useRouter} from 'next/navigation'; //클라이언트 컴포넌트에서 사용하는 useRouter. 서버 컴포넌트에서 사용하는 useRouter는 next/router 에서 import 해야함.
import axios, {AxiosError} from 'axios'; // fetch 보다 axios 사용을 주로 선호
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import router from 'next/router'

const styles : React.CSSProperties = {
    height:'100vh',
    display: 'flex',
    justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
    alignItems: 'center', //가로 축 중앙 정렬
    flexDirection: 'column', //아이템들 세로로 정렬
    paddingTop:'25vh',
    paddingBottom:'25vh',
    gap:'10px', // 아이템들 사이 간격
    backgroundColor: 'rgb(255,255,255)',
}

interface LoginResponseDto{ // swagger 에 있는 response schema
  user:{
    id:string,
    name: string,
  },
  accessToken: string,
}

function LoginPage() {
    // const [id,setId]=useState<string>('');
    // // const [password, setPassword]=useState<string>('');
    // const router=useRouter();

    const handleLogin = async (e: FormData) => {
       'use server'
       console.log(e.get('id'))
        // e.preventDefault(); // 폼 제출 기본 동작 방지

        // try { //[ ] http요청하는부분 따로 빼기, 코드 가독성 높이기
          const res = await axios('https://levelzero-backend.platform-dev.bagelgames.com/auth/login', { 
            method: 'POST',
            headers: { //http 요청의 헤더 설정
              'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄. 사실 axios 는 기본 설정되어 있음. 생략 가능.
              'accept' : 'application/json' ,
            },
            data: { 
              "id": e.get('id'),
              "password": e.get('password'),
            }, //입력된 아이디, 비번을 json형태로 변환해서 요청
          })
          if(!res) console.log('error: login failed')
          else{
            const loginResponse : LoginResponseDto = res.data;
            console.log(loginResponse);
            cookies().set('accessToken', loginResponse.accessToken)
            cookies().set('userId', loginResponse.user.id)
            redirect('/') //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
          }
    };

    return(
    <div style={styles}>
        <h2>Log in</h2>
        <form action={handleLogin} style={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
            <TextField id="id" label="id" variant="outlined"  name="id"/>
            <TextField id="password" label="password" variant="filled" name="password"/>
            <Button type="submit" variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff' }}>LOG IN</Button>
        </form>
    </div>
    );
}

export default LoginPage;