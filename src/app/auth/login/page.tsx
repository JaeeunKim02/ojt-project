'use client'; //TODO: effective typescript 책
import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {useRouter} from 'next/navigation'; //클라이언트 컴포넌트에서 사용하는 useRouter. 서버 컴포넌트에서 사용하는 useRouter는 next/router 에서 import 해야함.

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

function LoginPage() {
    const [id,setId]=useState('');
    const [password, setPassword]=useState('');
    const router=useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // TODO: 폼 제출 기본 동작 방지, preventDefault 굳이 써야 하는 이유?
    
        try {
          const response = await fetch('https://levelzero-backend.platform-dev.bagelgames.com/auth/login', { // axios 사용 찾아보기
            method: 'POST',
            headers: { //http 요청의 헤더 설정
              'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄
              // 'accept' : 'application/json' ,
            },
            body: JSON.stringify({ 
              "id": id, 
              "password": password
            }), //입력된 아이디, 비번을 json형태로 변환해서 요청
          })
          .then(res=>{
            if(!res.ok){
              throw new Error('Login Failed'); //TODO:async await 공부 & then 없애보기
            }
            return res.json()
          })
          .then(res=>{
            console.log(res)
            localStorage.setItem('accessToken', res.accessToken) //TODO: res.accessToken type any 없애기
            router.push('/');
          })
        }catch(error) {
            console.error('Login Error:', error); //TODO:error 발생시 동작 조금 더 생각하기
        }
    };

    return(
    <div style={styles}>
        <h2>Log in</h2>
        <form onSubmit={handleLogin} style={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
            <TextField id="id" label="id" variant="outlined" value={id} onChange={(e)=>setId(e.target.value)}/>
            <TextField id="password" label="password" variant="filled" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button type="submit" variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff' }}>LOG IN</Button>
        </form>
    </div>
    );
}

export default LoginPage;