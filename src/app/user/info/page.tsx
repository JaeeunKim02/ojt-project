'use client';
import Authentication from '../../../components/Authentication';

const styles: React.CSSProperties = {
  flexDirection: "row",
  height:'100vh',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
  backgroundColor: 'rgb(255,255,255)',
};
//[x] api athorization

export default async function Userinfopage() {
  Authentication('/mypage','/auth/login')
}