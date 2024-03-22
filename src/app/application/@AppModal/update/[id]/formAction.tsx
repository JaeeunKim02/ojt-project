'use server';
import React from 'react';
import { redirect } from 'next/navigation';
import fetchAPI from '../../../../api';
import { cookies } from 'next/headers';

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

async function PostAction(prevState: FormState, formData: FormData) {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const id = formData.get('id');
    const res = await fetchAPI(
      `/application/${id}`,
      'PUT',
      {
        name: formData.get('name'),
        description: formData.get('description'),
      },
      `Bearer ${accessToken}`,
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error('Invalid request');
    }
  } catch (error) {
    console.error('Update Application Error:', error);
    return {
      message: `${error}` || 'An error occurred during adding application.',
    };
  }
  redirect('/application'); //try-catch 문에서 사용은 자제하기, try 안에서 redirect 하면 redirect가 내부적으로 error로 인식해버림!
}

export default PostAction;
