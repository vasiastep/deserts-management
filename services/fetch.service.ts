type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetchAPI = async (
  input: string,
  method: Method,
  body?: Record<string, any>,
  headers?: Record<string, any>,
) => {
  const contentType = 'application/json';

  return await fetch(`/api${input}`, {
    method: method,
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
      ...headers,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
