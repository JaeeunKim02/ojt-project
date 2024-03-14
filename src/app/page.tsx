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
  const isLoggedIn = cookies().get('isLoggedIn')?.value ==='true' //쿠키의 value 속성은 쿠키의 값을 'string' 형태로 반환하기 때문
  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      <Loginbutton isLoggedIn={isLoggedIn}/>
      <Link href="/user/register">Sign up</Link>
      <Button href="/mypage">My Page</Button>
    </div>
  );
}