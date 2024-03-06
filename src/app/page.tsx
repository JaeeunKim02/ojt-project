'use client'; //TODO : use server 와 use client인 컴포넌트 구분해주기
import Link from 'next/link';//TODO prettier
import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';
import React,{useState, useEffect} from 'react';

const styles = {
  height:'75px',
  display: 'flex',
  gap:'10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
  // position: 'fixed',
  padding:'10px',
  // opacity:'0.8',
};

export default function Home() {
  const router=useRouter();
  const [isLogin, setIslogin] = useState(false); // TODO: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...


  useEffect(() => {
    // 로컬 스토리지에서 accessToken 존재 여부 확인
    const token = localStorage.getItem('accessToken');
    setIslogin(!!token);
  }, []); // 빈 배열일 경우 컴포넌트가 처음 렌더링될 때에만(마운트될 때에만) 함수가 호출됨

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIslogin(false);
    router.push('/');
  };

  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      {isLogin ? (<Button onClick={handleLogout}>LOG OUT</Button>) : (<Button href="/auth/login">LOG IN</Button>) }
      <Link href="/user/register">Sign up</Link>
      {isLogin ? (<Button href="/mypage">My Page</Button>) : (<Button href="/auth/login">My Page</Button>) }
    </div>
  );
}
