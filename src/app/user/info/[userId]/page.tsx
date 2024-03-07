'use client';
import LeftNavigation from '../../../../components/left/LeftNavigation';
import RightComponent from '../../../../components/right/RightComponent';
import React from 'react';
// import axios from 'axios';
// import {useRouter} from 'next/navigation';

const styles: React.CSSProperties = {
  flexDirection: "row",
  height:'100vh',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
  backgroundColor: 'rgb(255,255,255)',
};

export default function Home() {
  return (
    <div style={styles}>
      <LeftNavigation />
      <RightComponent />
    </div>
  );
}