//[x] isLoggedIn 굳이? accessToken으로 하는게 낫지 않나
import Link from 'next/link'; //[x] prettier
import { Button } from '@mui/material';
import Loginbutton from './components/Loginbutton';
import { cookies } from 'next/headers';

export default function Home() {
  return (
    <div>
      <h1>This is home.</h1>
    </div>
  );
}
