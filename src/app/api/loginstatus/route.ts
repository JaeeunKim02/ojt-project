import { cookies } from 'next/headers';

export async function GET() {
  const accessToken = cookies().get('accessToken')?.value;
  const userId = cookies().get('userId')?.value;

  const res = await fetch(`https://levelzero-backend.platform-dev.bagelgames.com/user/info/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    console.log(2);
    return new Response(JSON.stringify({ isLoggedIn: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.log(3);
    console.error('Authentication error');
    return new Response(JSON.stringify({ isLoggedIn: false }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
