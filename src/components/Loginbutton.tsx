'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import LoadingPage from './LoadingPage';

const Loginbutton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // 로그인 상태 확인
  // useEffect(() => {
  //   fetch('/api/loginstatus')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setIsLoggedIn(data.isLoggedIn);
  //     });
  // },[]);
  console.log(isLoggedIn)
  fetch('/api/loginstatus')
  .then((res) => res.json())
  .then((data) => 
    setIsLoggedIn(data.isLoggedIn));


  console.log(isLoggedIn)

  // 로그아웃 처리
  const handleLogout = () => {
    fetch('/api/logouthandler')
      .then(() => {
        setIsLoggedIn(false);
        // 로그아웃 후 홈으로 리다이렉트
        router.push('/');
      });
  };

  // 로그인 페이지로 이동
  const handleLogin = () => {
    router.push('/auth/login');
  };

  // if(isLoading) return <><LoadingPage/></>; // 로딩 중...
  console.log(isLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}
    </>
  );
};

export default Loginbutton;