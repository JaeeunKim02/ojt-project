//[ ] 팝업으로 어떤 에러인지 알려주는게 나을듯
import React from 'react';

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center', // 시작 지점에서 아이템들 정렬
  alignItems: 'center', //가로 축 중앙 정렬
  flexDirection: 'column', //아이템들 세로로 정렬
  paddingTop: '25vh',
  paddingBottom: '25vh',
  gap: '10px', // 아이템들 사이 간격
  // backgroundColor: 'rgb(255,255,255)',
};

function errorPage() {
  return (
    <div style={styles}>
      <h3>Invalid ID or Password! Retry...</h3>
    </div>
  );
}

export default errorPage;
