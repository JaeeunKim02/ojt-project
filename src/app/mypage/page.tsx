import LeftNavigation from './left/LeftNavigation';
import RightComponent from './right/RightComponent';
import React from 'react';

const styles: React.CSSProperties = {
  // height: '80vh',
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
};

export default function Mypage() {
  return (
    <div style={styles}>
      <LeftNavigation />
      <RightComponent />
    </div>
  );
}
