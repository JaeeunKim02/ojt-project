'use client';
import LeftNavigation from './left/LeftNavigation';
import RightComponent from './right/RightComponent';
import React from 'react';

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