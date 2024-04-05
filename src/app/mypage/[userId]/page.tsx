'use server';
import LeftNavigation from '../components/left/LeftNavigation';
import RightComponent from '../components/right/RightComponent';
import React from 'react';
import { myInfo } from '../../../api/userApi';

const styles: React.CSSProperties = {
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
  const res = await myInfo();
  if (res.message) {
    return <>{res.message}</>;
  }
  if (res.id !== params.userId) {
    return <>Invalid request</>;
  }
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
