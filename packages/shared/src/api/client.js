async function apiFetch(URI, options = {}) {
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`http://localhost:3000/${URI}`, {
    ...options, // method and body
    headers: {
      ...headers,
      ...(options?.headers
        ? options.headers
        : { "Content-Type": "application/json" }),
    },
  });

  if (!res.ok) {
    throw new Error(res.status);
  }

  return res.json();
}

export { apiFetch };
