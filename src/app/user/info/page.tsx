'use client';
import LeftNavigation from '../../../components/left/LeftNavigation';
import RightComponent from '../../../components/right/RightComponent';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

const styles: React.CSSProperties = {
  flexDirection: "row",
  height:'100vh',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
  backgroundColor: 'rgb(255,255,255)',
};
//[ ] api athorization
export default function Home() {
  const router=useRouter();

  useEffect(() => { //[ ] 마운트 될때만 하는거면 useEffect 쓸필요 있나?
    // 로컬 스토리지에서 accessToken 존재 여부 확인
    const checkAuthentication = async() =>{
      const accessToken = localStorage.getItem('accessToken');
      const userId=localStorage.getItem('id');
      try{
        const res = await axios.get(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
            }
        })
      } catch(error){
        console.error(error);
        router.push('/auth/login');
      }
    };
    checkAuthentication();

  },[]); // 빈 배열일 경우 컴포넌트가 처음 렌더링될 때에만(마운트될 때에만) 함수가 호출됨

  return(
    <div style={styles}>
      <LeftNavigation />
      <RightComponent />
    </div>
  );
}
