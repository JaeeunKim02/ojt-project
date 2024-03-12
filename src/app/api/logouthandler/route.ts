export async function GET() {

    const headers = new Headers();
    headers.append('Set-Cookie', 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    headers.append('Set-Cookie', 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: headers
      });
  }
  