export async function POST() {

    const headers = new Headers();
    headers.append('Set-Cookie', 'accessToken=; path=/; Max-Age=0; HttpOnly');
    headers.append('Set-Cookie', 'userId=; path=/; Max-Age=0; HttpOnly');
    headers.append('Set-Cookie', 'isLoggedIn=; path=/; Max-Age=0; HttpOnly');
    headers.append('Content-Type', 'application/json');
  
    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: headers
    })
  }
  