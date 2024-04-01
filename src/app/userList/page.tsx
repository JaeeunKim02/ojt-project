'use server';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; //포스트잇처럼 화면에서 도드라짐-elevation:튀어나옴, outlined:윤곽선
import { Button } from '@mui/material';
import Link from 'next/link';
import { cookies } from 'next/headers';

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
      throw new Error('Invalid request');
    } else {
      const dto = await res.json();
      return (
        <div className="flex flex-col bg-white p-[50px] gap-[20px]">
          <h1 className="text-[25px] font-bold">Gaia Applications</h1>
          <Link href="/application/create">+ Add application</Link>
          {/* 버튼 쓰면 모달창 안 띄워짐 */}
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '650px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>App Name</TableCell>
                  <TableCell>App Description</TableCell>
                  <TableCell>Go to App</TableCell>
                  <TableCell>Update App</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dto.appList.map((apps: AppsDto) => (
                  <TableRow
                    key={apps.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {apps.id}
                    </TableCell>
                    <TableCell>{apps.name}</TableCell>
                    <TableCell>{apps.description}</TableCell>
                    <TableCell>
                      <Button href={`/application/${apps.id}`}>Goto</Button>
                    </TableCell>
                    <TableCell>
                      <Link href={`/application/update/${apps.id}`}>
                        Update
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex flex-row justify-center gap-[15px]">
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
