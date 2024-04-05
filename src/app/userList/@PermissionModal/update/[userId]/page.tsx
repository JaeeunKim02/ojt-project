'use server';
import UpdateModal from './UpdateModal';
import { userInfo } from '../../../../../api/userApi';
import { cookies } from 'next/headers';

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
