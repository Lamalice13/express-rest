import { apiFetch } from "@monorepo/shared/client";

function patchPost(endpoint, options = "", contentType = "") {
  return apiFetch(
    `posts/${endpoint}`,
    { method: "PATCH", ...options },
    contentType,
  );
}

function deletePost(endpoint) {
  apiFetch(`posts/${endpoint}`, { method: "DELETE" });
}

function createPost(options = "", contentType = "") {
  return apiFetch(`posts`, { method: "POST", ...options }, contentType);
}

export { patchPost, deletePost, createPost };
