'use client'; //[ ] use server 와 use client인 컴포넌트 구분해주기
import Link from 'next/link';//TODO prettier
import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

const styles = {
  height:'75px',
  display: 'flex',
  gap:'10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
  padding:'10px',
};

export default function Home() {
  const router=useRouter();
  // TODO: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    router.push('/');
  };
  const [isLogin, setIsLogin]=useState<boolean>();
  useEffect(() => { //[ ] 마운트 될때만 하는거면 useEffect 쓸필요 있나?
    // 로컬 스토리지에서 accessToken 존재 여부 확인
    const checkAuthentication = async() =>{
      const accessToken = localStorage.getItem('accessToken');
      setIsLogin(!!accessToken);
      const userId=localStorage.getItem('id');
      try{
        const res = await axios.get(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
            }
        })
      } catch(error){
        console.error(error);
        router.push('/');
      }
    };
    checkAuthentication();

  },[]); // 빈 배열일 경우 컴포넌트가 처음 렌더링될 때에만(마운트될 때에만) 함수가 호출됨


// [ ] 여기서는 마이페이지로 이동하도록. 마이페이지 가서 인증확인하기
  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      {isLogin ? (<Button onClick={handleLogout}>LOG OUT</Button>) : (<Button href="/auth/login">LOG IN</Button>) }
      <Link href="/user/register">Sign up</Link>
      <Button href="/user/info">My Page</Button>
    </div>
  );
}
