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
import GotoApp from './GotoApp';
import UpdateApp from './UpdateApp';
import CreateApp from './CreateApp';
import { redirect } from 'next/navigation';

const styles: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(255,255,255)',
  padding: '50px',
  gap: '20px',
};

function createData(number: number, appName: string, appIdentifier: string) {
  return { number, appName, appIdentifier };
}

const rows = [
  createData(1, 'GaiaApplication', 'GaiaAdministrator'),
  createData(2, 'SCS-RealMatch', 'RealMatch'),
  createData(3, 'expRandomDragons', 'RandomDragons'),
  createData(4, 'balvenie', 'balvenie'),
  createData(5, 'Roll & Slay', 'NctRollAndSlay'),
];

export default async function BasicTable() {
  return (
    <div style={styles}>
      <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>
        Gaia Applications
      </h1>
      <form action={CreateApp}>
        <Button style={{ width: '10%' }}>+ Add application</Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>appName</TableCell>
              <TableCell>appIdentifier</TableCell>
              <TableCell>appSecret</TableCell>
              <TableCell>Goto</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell>{row.appName}</TableCell>
                <TableCell>{row.appIdentifier}</TableCell>
                <TableCell>********</TableCell>
                <TableCell>
                  <form action={GotoApp}>
                    <Button type="submit" value={`${row.number}`} name="id">
                      Goto
                    </Button>
                  </form>
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
