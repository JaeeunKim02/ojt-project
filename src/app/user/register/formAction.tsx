//[x] api 호출 오류 어떻게 확인? -> try catch 구문이나 Promise의 .catch() 를 사용하여 에러 캐치
//[x] 환경변수
'use server';
import React from 'react';
import { Button, TextField } from '@mui/material';
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
type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  const id = (formData.get('id') ?? '') as string;
  const password = (formData.get('password') ?? '') as string;
  const name = (formData.get('name') ?? '') as string;

  if (password.length < 8) {
    return { message: 'User password must be longer than 8 letters!' };
  }
  try {
    const res = await fetch(`${process.env.API_URL}/user/register`, {
      method: 'POST',
      headers: {
        //http 요청의 헤더 설정
        'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄
        'accept': 'application/json',
      },
      body: JSON.stringify({
        'id': formData.get('id'),
        'password': formData.get('password'),
        'name': formData.get('name'),
      }), //입력된 아이디, 비번을 json형태로 변환해서 요청
    });
    if (!res.ok) {
      throw new Error('Signup failed');
    }
  } catch (error) {
    console.error('Signup Error:', error);
    return { message: `${error}` || 'An error occurred during signup.' };
    // [x] error.ts, 팝업, 모달, 토스트...안티디자인?
  }
  redirect('/'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export default onFormPostAction;
