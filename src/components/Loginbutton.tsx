'use client';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';

const Loginbutton=()=>{
    const [isLogin, setIsLogin] = useState<boolean>();
    const router=useRouter();
    useEffect(()=>{
      const accessToken = localStorage.getItem('accessToken');
      setIsLogin(!!accessToken);
    },[])
    
    // [x]: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('id');
      router.push('/');
    };
    
    return(
        <>{isLogin ? (<Button onClick={handleLogout}>LOG OUT</Button>) : (<Button onClick={()=>{router.push('/auth/login')}}>LOG IN</Button>) }</>
    );
}

export default Loginbutton;