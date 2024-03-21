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
import UpdateApp from './UpdateApp';
import Link from 'next/link';
import { cookies } from 'next/headers';

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(255,255,255)',
  padding: '50px',
  gap: '20px',
};
interface AppsDto {
  id: number;
  name: string;
  description: string;
}
export default async function BasicTable() {
  'use server';
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const res = await fetch(`${process.env.API_URL}/application/list`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.log(res);
      if (res.status === 401) throw new Error('Unauthorized');
      throw new Error('Invalid request');
    } else {
      const dto = await res.json();
      return (
        <div style={styles}>
          <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>
            Gaia Applications
          </h1>
          <Link href="/application/create">+ Add application</Link>
          {/* 버튼 쓰면 모달창 안 띄워짐 */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>App Name</TableCell>
                  <TableCell>App Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dto.map((apps: AppsDto) => (
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
                      <Button href={`/application/${apps.id}`} name="id">
                        Goto
                      </Button>
                    </TableCell>
                    <TableCell>
                      <form action={UpdateApp}>
                        <Button type="submit">Update</Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
