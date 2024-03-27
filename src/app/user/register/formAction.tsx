//[x] api 호출 오류 어떻게 확인? -> try catch 구문이나 Promise의 .catch() 를 사용하여 에러 캐치
//[x] 환경변수
'use server';
import React from 'react';
import { redirect } from 'next/navigation';
import fetchAPI from '../../api';

type FormState = {
  message: string;
};
async function onFormPostAction(prevState: FormState, formData: FormData) {
  const password = (formData.get('password') ?? '') as string; // User password must be longer than 8 letters

  if (password.length < 8) {
    return { message: 'User password must be longer than 8 letters!' };
  }
  try {
    //[ ] fetchAPI 쓴게 공통화가 좀 덜 된 느낌 -> signupAPI, loginAPI로 나누기
    //[ ] public/image/picture.png -> 로그아웃 상태에서도 접근 가능하므로 접근못하게 하기
    const res = await fetchAPI('/user/register', 'POST', {
      id: formData.get('id'),
      password: formData.get('password'),
      name: formData.get('name'),
    });
    if (!res.ok) {
      if (res.status === 409) throw new Error('User id already exists!');
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
