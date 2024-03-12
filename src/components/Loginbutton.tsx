'use client';
// 'use server';
// // import {useState, useEffect} from 'react';
// // import {useRouter} from 'next/navigation';
// import {Button} from '@mui/material';
// import {redirect} from 'next/navigation'
// import {cookies} from 'next/headers'


// const Loginbutton:React.FC<{ isLogin : boolean }>= async ({ isLogin })=>{
//     // const [isLogin, setIsLogin] = useState<boolean>();
//     // const router=useRouter();
//     // useEffect(()=>{
//     //   const accessToken = localStorage.getItem('accessToken');
//     //   setIsLogin(!!accessToken);
//     // },[])
    
//     // [x]: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...
//     const handleLogout = async () => {
//       'use server'
//       cookies().delete('accessToken');
//       cookies().delete('userId');
//       redirect('/');
//     };
//     const redirection= async () =>{
//       'use server'
//       redirect('/auth/login');
//     };
//     return(//RSC 에서 RCC로 function과 같이 직렬화 불가능한 객체를 prop으로 넘겨줄 수 없다.
//     //서버 action을 사용하면 RSC에서 RCC로 function(use server)을 prop으로 넘겨주기 가능
//         <>{!!isLogin ? (<Button action={handleLogout}>LOG OUT</Button>) : (<Button action={redirection} >LOG IN</Button>) }</>
        
//     );
// }

// export default Loginbutton;


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Loginbutton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    console.log("use effect call")
    fetch('/api/loginstatus')
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn));
  },[]);

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
