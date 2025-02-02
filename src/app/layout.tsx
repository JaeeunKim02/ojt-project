import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link'; //[x] prettier
import { Button } from '@mui/material';
import Loginbutton from './components/Loginbutton';
import { cookies } from 'next/headers';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(255,255,255)',
};

const header: React.CSSProperties = {
  height: '6.5%',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn: boolean = !!cookies().get('accessToken')?.value; //쿠키의 value 속성은 쿠키의 값을 'string' 형태로 반환하기 때문
  return (
    <html lang="en">
      <body className={inter.className} style={styles}>
        <div className="navbar" style={header}>
          <Button href="/" style={{ marginLeft: '20px' }}>
            Home
          </Button>
          {/* button에 className의 적용이 딜레이 됨... */}
          <Loginbutton isLoggedIn={isLoggedIn} />
          <Link href="/user/register">Sign up</Link>
          <Button href="/mypage">My Page</Button>
          <Button href="/application?page=1&size=10">App 1</Button>
          <Button href="/application2?page=1&size=12">App 2</Button>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
