export default async function fetchAPI(path: string, method: string, data: Record<string, unknown>) {
  const url = `${process.env.API_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json', //요청 본문 타입이 json 형식임을 나타냄
    'accept': 'application/json',
  };
  const body = JSON.stringify(data);
  return await fetch(url, { method, headers, body });
}
