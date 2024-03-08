'use client';
import LeftNavigation from '../../../components/left/LeftNavigation';
import RightComponent from '../../../components/right/RightComponent';
import Authentication from '../../../components/Authentication';

const styles: React.CSSProperties = {
  flexDirection: "row",
  height:'100vh',
  display: 'flex',
  justifyContent: 'flex-start', // 시작 지점에서 아이템들 정렬
  backgroundColor: 'rgb(255,255,255)',
};
//[x] api athorization
export default function Mypage() {
  //[ ] 커스텀 훅
  Authentication('/auth/login');
  return(
    <div style={styles}>
      <LeftNavigation />
      <RightComponent />
    </div>
  );
}

// export async function getServerSideProps() {

// }