async function apiFetch(endpoint, options, contentType = "") {
  const BASE_URL = `https://${import.meta.env.VITE_BACKEND_HOST}`;
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
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
