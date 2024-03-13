//[ ] use server 와 use client인 컴포넌트 구분해주기
import Link from 'next/link';//[ ] prettier
import {Button} from '@mui/material';
import Loginbutton from '../components/Loginbutton';
import {cookies} from 'next/headers';

const styles = {
  height:'75px',
  display: 'flex',
  gap:'10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
  padding:'10px',
};

export default function Home() {
  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      <Loginbutton />
      <Link href="/user/register">Sign up</Link>
      <Button href="/mypage">My Page</Button>
    </div>
  );
}