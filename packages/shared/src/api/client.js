async function apiFetch(endpoint, options, contentType = "") {
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    ...options, // method and body
    headers: {
      ...headers,
      ...(options?.contentType
        ? options.contentType
        : { "Content-Type": "application/json" }),
    },
  });
  if (!res.ok) throw new Error(res.status);
  if (options.method !== "DELETE") return res;
}

export { apiFetch };
