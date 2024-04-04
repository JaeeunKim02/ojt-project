'use server';
import UpdateModal from './UpdateModal';
import { userInfo } from '../../../../../api/userApi';
import { cookies } from 'next/headers';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default async function Page({ params }: { params: { userId: string } }) {
  const recentUser = cookies().get('permission')?.value ?? '';
  const res = await userInfo(params.userId);
  console.log(res.id, res.name, res.permission);
  return (
    <UpdateModal
      userId={params.userId}
      defaultPermission={res.permission}
      recentUser={recentUser}
    />
  );
}
