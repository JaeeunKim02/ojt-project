//[ ] use server 와 use client인 컴포넌트 구분해주기
import Link from 'next/link'; //[ ] prettier
import { Button } from '@mui/material';
import Loginbutton from '../components/Loginbutton';
import { cookies } from 'next/headers';

const styles = {
  height: '100vh',
  display: 'flex',
  backgroundColor: 'rgb(255,255,255)',
};
const header = {
  height: '8%',
  width: '100%',
  display: 'flex',
  left: '0px',
  top: '0px',
  backgroundColor: 'rgb(230,230,230)',
  alignItems: 'center',
  gap: '30px', // 아이템들 사이 간격
  color: 'rgb(0,0,0)',
  padding: '20px',
};

export default function Home() {
  const isLoggedIn = cookies().get('isLoggedIn')?.value === 'true'; //쿠키의 value 속성은 쿠키의 값을 'string' 형태로 반환하기 때문
  return (
    <div style={styles}>
      <div style={header}>
        <Button href="/" style={{ marginLeft: '20px' }}>
          Home
        </Button>
        <Loginbutton isLoggedIn={isLoggedIn} />
        <Link href="/user/register">Sign up</Link>
        <Button href="/mypage">My Page</Button>
      </div>
    </div>
  );
}
