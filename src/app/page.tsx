import Link from 'next/link';

const styles = {
  height:'100vh',
  display: 'flex',
  gap:'10px', // 아이템들 사이 간격
  backgroundColor: 'rgb(255,255,255)',
};

export default function Home() {
  return (
    <div style={styles}>
      <Link href="/">Home</Link>
      <Link href="/auth/login">Log in</Link>
      <Link href="/user/register">Sign in</Link>
      <Link href="/mypage">My Page</Link>
    </div>
  );
}
