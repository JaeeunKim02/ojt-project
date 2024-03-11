
// import {useState, useEffect} from 'react';
// import {useRouter} from 'next/navigation';
import {Button} from '@mui/material';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation'


const Loginbutton=()=>{
    // const [isLogin, setIsLogin] = useState<boolean>();
    // const router=useRouter();
    // useEffect(()=>{
    //   const accessToken = localStorage.getItem('accessToken');
    //   setIsLogin(!!accessToken);
    // },[])
    
    // [x]: api를 불러와서 athorization 통과해야 마이페이지 보여주기 /islogin 조작가능하므로...
    const isLogin=cookies().get('accessToken');
    const handleLogout = async () => {
      'use server'
      cookies().delete('accessToken');
      cookies().delete('userId');
      redirect('/');
    };
    const redirection= async () =>{
      'use server'
      redirect('/auth/login');
    };
    return(
      <form action={handleLogout} >
        <>{!!isLogin ? (<Button type="submit" action={handleLogout}>LOG OUT</Button>) : (<Button type="submit" action={redirection}>LOG IN</Button>) }</>
      </form>
        
    );
}

export default Loginbutton;