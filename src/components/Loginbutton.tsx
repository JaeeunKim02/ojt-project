
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import LoadingPage from './LoadingPage';
import {redirect} from 'next/navigation'
import { logoutHandle } from '../app/action';

const Loginbutton:React.FC<{isLoggedIn: boolean}> = ({isLoggedIn}) => {
  return (
    <>
      {isLoggedIn ? (
        <form action={logoutHandle}>
          <button type='submit'>Log out</button>
        </form>
      ) : (
          <a href='/auth/login'>Log In</a>
      )}
    </>
  );
};

export default Loginbutton;

// 로그아웃 처리
  // const handleLogout = async () => {
  //   'use server'
  //   await fetch('/api/logouthandler')
  //     .then(() => {
  //       // setIsLoggedIn(false);
  //       // 로그아웃 후 홈으로 리다이렉트
  //       // router.push('/');
  //       redirect('/')
  //     });
  // };

  // 로그인 페이지로 이동
  // const handleLogin = async () => {
  //   'use server'
  //   // router.push('auth/login')
  //   redirect('/auth/login');
  // };

  // if(isLoading) return <><LoadingPage/></>; // 로딩 중...