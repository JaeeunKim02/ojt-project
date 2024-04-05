import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Loginbutton from './components/Loginbutton';
import { cookies } from 'next/headers';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import UserIcon from './components/UserIcon';
import { userInfo } from '@/api/userApi';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn: boolean = !!cookies().get('accessToken')?.value; //쿠키의 value 속성은 쿠키의 값을 'string' 형태로 반환하기 때문
  const permission: string = cookies().get('permission')?.value ?? '';
  const userId: string = cookies().get('userId')?.value ?? '';
  let res = null;
  if (isLoggedIn) {
    res = await userInfo(userId);
    if (res.message) {
      return <>{res.message}</>;
    }
  }
  return (
    <html lang="en">
      <body className={inter.className} style={styles}>
        <AppBar position="static" style={{ backgroundColor: 'gray' }}>
          <Toolbar style={{ gap: '40px', margin: '10px' }}>
            <Link
              href="/"
              style={{
                marginLeft: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Image
                src="/image/bagelcodeIcon.png"
                alt="picture"
                width="50"
                height="50"
              />
              BAGELCODE
            </Link>
            <Link href="/application?page=1&size=12">APP LIST</Link>
            {(permission === 'admin' || permission === 'manager') && (
              <Link href="/userList?page=1&size=10">USER LIST</Link>
            )}
            {!isLoggedIn && (
              <Link
                href="/signup"
                style={{ marginLeft: 'auto', textAlign: 'center' }}
              >
                SIGN UP
              </Link>
            )}
            <Loginbutton isLoggedIn={isLoggedIn} />
            {res && (
              <UserIcon
                userId={res.id}
                name={res.name}
                permission={res.permission}
              />
            )}
          </Toolbar>
        </AppBar>
        <div>{children}</div>
      </body>
    </html>
  );
}
