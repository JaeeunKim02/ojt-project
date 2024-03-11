'use client';
import LeftNavigation from '../../components/left/LeftNavigation';
import RightComponent from '../../components/right/RightComponent';
import React from 'react';

const styles: React.CSSProperties = {
    flexDirection: "row",
    height:'100vh',
    display: 'flex',
    justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
    backgroundColor: 'rgb(255,255,255)',
  };

export default function Mypage() {
    return(
        <div style={styles}>
            <LeftNavigation />
            <RightComponent />
        </div>
    );
}