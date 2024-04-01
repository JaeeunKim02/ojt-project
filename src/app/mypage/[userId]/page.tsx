'use server';
import LeftNavigation from '../components/left/LeftNavigation';
import RightComponent from '../components/right/RightComponent';
import React from 'react';
import { userInfo } from '../../../api/userApi';

const styles: React.CSSProperties = {
  // height: '80vh',
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
};

//defining props type
export default async function Mypage({
  params,
}: {
  params: { userId: string };
}) {
  console.log(params.userId);
  const res = await userInfo(params.userId);
  return (
    <>
      <div style={styles}>
        <LeftNavigation />
        <RightComponent />
      </div>
      <div>
        <p>user id: {res.id}</p>
        <p>user name: {res.name}</p>
        <p>permission: {res.permission}</p>
      </div>
    </>
  );
}
