'use server';
import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AppBox from './components/AppBox';

interface AppsDto {
  id: number;
  name: string;
  description: string;
}
export default async function BasicTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  'use server';
  // const searchParams = request.nextUrl.searchParams;
  // console.log(params);
  console.log(searchParams);
  const page = Number(searchParams?.page);
  const size = Number(searchParams?.size);
  console.log(page, size);
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const permission = cookies().get('permission')?.value;
    const res = await fetch(
      `${process.env.API_URL}/application/list?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
      },
    );
    if (!res.ok) {
      console.log(res);
      if (res.status === 401) throw new Error('Unauthorized');
      if (res.status === 403) throw new Error('permission denied');
      throw new Error('Invalid request');
    } else {
      const dto = await res.json();
      return (
        <div
          className="
        flex 
        flex-col 
        pt-[50px]
        pl-[30%] 
        pr-[30%] 
        gap-[20px]
      "
        >
          <h1 className="text-[25px] font-bold">Gaia Applications</h1>
          {permission === 'manager' || permission === 'admin' ? (
            <Link
              className="flex rounded-lg text-[#fff] self-end items-center justify-center text-center h-[45px] w-[200px] text-[18px] p-[10px] bg-blue-400 hover:bg-blue-500"
              href="/application/create"
            >
              + Add application
            </Link>
          ) : (
            <span className="flex rounded-lg text-[#fff] self-end items-center justify-center text-center h-[45px] w-[200px] text-[18px] p-[10px] bg-gray-300">
              + Add application
            </span>
          )}
          {/* 버튼 쓰면 모달창 안 띄워짐 */}
          <div className="grid  gap-x-6 gap-y-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
            {dto.appList.map((app: AppsDto) => (
              <div key={app.id}>
                <AppBox
                  id={app.id}
                  name={app.name}
                  description={app.description}
                  image="/image/bagelcodeIcon.png"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center gap-[15px] m-[30px]">
            {page === 1 ? (
              <span className="text-gray-400">이전</span>
            ) : (
              <Link
                href={{
                  pathname: '/application',
                  query: { page: `${page - 1}`, size: `${size}` },
                }}
              >
                이전
              </Link>
            )}
            <span>{dto.currentPage}</span>
            {page === dto.maxPage ? (
              <span className="text-gray-400">다음</span>
            ) : (
              <Link
                href={{
                  pathname: '/application',
                  query: { page: `${page + 1}`, size: `${size}` },
                }}
              >
                다음
              </Link>
            )}
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Cannot get application list.', error);
    return (
      <>
        <h1>Cannot get application list.</h1>
      </>
    );
  }
}
