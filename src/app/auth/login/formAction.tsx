'use server';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

interface UserDto {
  id: string;
  name: string;
}

interface LoginResponseDto {
  accessToken: string;
  user: UserDto;
}
type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        //http 요청의 헤더 설정
        'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄. 사실 axios 는 기본 설정되어 있음. 생략 가능.
        'accept': 'application/json',
      },
      body: JSON.stringify({
        'id': formData.get('id'),
        'password': formData.get('password'),
      }), //입력된 아이디, 비번을 json형태로 변환해서 요청
    });

    if (!res.ok) {
      throw new Error('Login failed');
    } else {
      const dto: LoginResponseDto = await Promise.resolve(res.json());
      cookies().set('accessToken', dto.accessToken);
      cookies().set('userId', dto.user.id);
    }
  } catch (error) {
    console.error('Login error:', error);
    return { message: `${error}` || 'An error occurred during signup.' };
  }
  redirect('/'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export default onFormPostAction;
