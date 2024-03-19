'use client';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-dom';
import onFormPostAction from './formAction';

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
  alignItems: 'center', //가로 축 중앙 정렬
  flexDirection: 'column', //아이템들 세로로 정렬
  paddingTop: '25vh',
  paddingBottom: '25vh',
  gap: '10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
};

function LoginPage() {
  const [state, action] = useFormState(onFormPostAction, { message: '' });
  return (
    <div style={styles}>
      <h2>Log in</h2>
      <form action={action} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
        <TextField id="id" label="id" variant="outlined" name="id" />
        <TextField type="password" id="password" label="password" variant="filled" name="password" />
        <Button type="submit" variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff' }}>
          LOG IN
        </Button>
        <p style={{ color: 'red' }}>{state.message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
