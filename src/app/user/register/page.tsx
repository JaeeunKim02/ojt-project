'use client';
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

function SignupPage() {
    const [id,setId]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const router=useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
    
        try {
          const response = await fetch('https://levelzero-backend.platform-dev.bagelgames.com/user/register', {
            method: 'POST',
            headers: { //http 요청의 헤더 설정
              'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄
              'accept': 'application/json',
            },
            body: JSON.stringify({ 
              "id": id, 
              "password": password,
              "name": name
            }), //입력된 아이디, 비번을 json형태로 변환해서 요청
          })
          .then(res=>{
            console.log(res);
            if(!res.ok){
              throw new Error('Signup Failed');
            }
            return res.json()
          })
          .then(res=>{
            console.log(res)
            router.push('/');
          })
        }catch(error) {
            console.error('Signup Error:', error);
        }
    };

    return(
    <div style={styles}>
        <h2>Sign up</h2>
        <form onSubmit={handleSignup} style={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
            <TextField id="name" label="name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
            <TextField id="id" label="id" variant="outlined" value={id} onChange={(e)=>setId(e.target.value)}/>
            <TextField id="password" label="password" variant="filled" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button type="submit" variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff' }}>SIGN UP</Button>
        </form>
    </div>
    );
}

export default SignupPage;