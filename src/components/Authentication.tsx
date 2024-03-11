'use client'; //[ ] use server 와 use client인 컴포넌트 구분해주기
import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';

function Authentication(linkTo1:string, linkTo2:string) {

    const router=useRouter();
    
    // [x]: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...
    // useEffect(() => { //[x] 마운트 될때만 하는거면 useEffect 쓸필요 있나?->리렌더링하는게 너무 많다고 뜸..useEffect 하면 안뜸
    //   // 로컬 스토리지에서 accessToken 존재 여부 확인
    //   const checkAuthentication = async () =>{
    //     const accessToken = localStorage.getItem('accessToken');
    //     const userId=localStorage.getItem('id');
    //     try{
    //       const response = await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`,{
    //         method: 'GET',
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`
    //           },
    //         // cache: 'no-store',
    //       })

    //       if (!response.ok)
    //         router.push(linkTo2)  
    //       else
    //         router.push(linkTo1)
    //     } catch(error) {
    //       console.error(error);
    //       router.push(linkTo2)
    //     }
    //   };
    //   checkAuthentication();
    // },[]); // 빈 배열일 경우 컴포넌트가 처음 렌더링될 때에만(마운트될 때에만) 함수가 호출됨
    const checkAuthentication = async () =>{
      const accessToken = localStorage.getItem('accessToken');
      const userId=localStorage.getItem('id');
      try{
        const response = await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
            },
          // cache: 'no-store',
        })

        if (!response.ok)
          router.push(linkTo2)  
        else
          router.push(linkTo1)
      } catch(error) {
        console.error(error);
        router.push(linkTo2)
      }
    };
}

export default Authentication;