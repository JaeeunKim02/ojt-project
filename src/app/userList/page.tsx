'use server';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; //포스트잇처럼 화면에서 도드라짐-elevation:튀어나옴, outlined:윤곽선
import Link from 'next/link';
import { cookies } from 'next/headers';
import fetchAPI from '@/api/api';
import Tooltip from '@mui/material/Tooltip';

interface UsersDto {
  id: string;
  name: string;
  permission: string;
}
export default async function BasicTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  'use server';
  const page = Number(searchParams?.page);
  const size = Number(searchParams?.size);
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const permission = cookies().get('permission')?.value;
    const res = await fetchAPI.get(
      `/user/list?page=${page}&size=${size}`,
      `${accessToken}`,
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      if (res.status === 403) throw new Error('permission denied');
      throw new Error('Invalid request');
    } else {
      const dto = await res.json();
      return (
        <div className="flex flex-col bg-white pt-[50px] pl-[20%] pr-[20%] gap-[20px]">
          <h1 className="text-[25px] font-bold">Gaia Admin</h1>
          {/* 버튼 쓰면 모달창 안 띄워짐 */}
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '500px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Permission</TableCell>
                  <TableCell align="center">Update permission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dto.userList.map((user: UsersDto) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.permission}</TableCell>
                    <TableCell align="center">
                      {permission === 'admin' ? (
                        <Link
                          href={`/userList/update/${user.id}`}
                          style={{ color: '#1976d2' }}
                        >
                          Update
                        </Link>
                      ) : (
                        <Tooltip title="only admin can access">
                          <span className="text-gray-300">Update</span>
                        </Tooltip>
                      )}
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
                  pathname: '/userList',
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
                  pathname: '/userList',
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
    console.error('Cannot get User list.', error);
    return (
      <>
        <h1>Cannot get User list.</h1>
      </>
    );
  }
}
