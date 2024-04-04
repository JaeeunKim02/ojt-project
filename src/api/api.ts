const fetchAPI = {
  async get(path: string, accessToken: string) {
    const url = `${process.env.API_URL}${path}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return await fetch(url, { method: 'GET', headers: headers });
  },
  async post(
    path: string,
    data: Record<string, unknown>,
    accessToken?: string,
  ) {
    const url = `${process.env.API_URL}${path}`;
    let headers;
    if (accessToken) {
      headers = {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      headers = {
        'Content-Type': 'application/json',
        accept: 'application/json',
      };
    }
    const body = JSON.stringify(data);
    return await fetch(url, { method: 'POST', headers: headers, body: body });
  },
  async put(path: string, data: Record<string, unknown>, accessToken?: string) {
    const url = `${process.env.API_URL}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const body = JSON.stringify(data);
    return await fetch(url, { method: 'PUT', headers: headers, body: body });
  },
};

export default fetchAPI;
