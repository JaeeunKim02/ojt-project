'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';
import React,{useState, useEffect} from 'react';

const styles = {
  height:'60px',
  display: 'flex',
  gap:'10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(0,0,0)',
  position: 'fixed',
  padding:'10px',
  opacity:'0.8',
};

export default function Home() {
  const router=useRouter();
  const [isLogin, setIslogin] = useState(false);


  useEffect(() => {
    // 로컬 스토리지에서 accessToken 존재 여부 확인
    const token = localStorage.getItem('accessToken');
    setIslogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIslogin(false);
    router.push('/');
  };

  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      {isLogin ? (<Button onClick={handleLogout}>LOG OUT</Button>) : (<Button href="/auth/login">LOG IN</Button>) }
      <Link href="/user/register">Sign in</Link>
      {isLogin ? (<Button href="/mypage">My Page</Button>) : (<Button href="/auth/login">My Page</Button>) }
    </div>
  );
}
