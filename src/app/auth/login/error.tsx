'use client'; // Error components must be Client Components
import React from 'react';
import { Button } from '@mui/material';

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center', // 시작 지점에서 아이템들 정렬
  alignItems: 'center', //가로 축 중앙 정렬
  flexDirection: 'column', //아이템들 세로로 정렬
  // paddingTop: '25%',
  // paddingBottom: '25%',
  gap: '10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={styles}>
      <h1>Sorry...Retry!</h1>
      <p>{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        style={{ backgroundColor: '#1976d2', color: '#fff' }}
      >
        Try again
      </Button>
    </div>
  );
}
