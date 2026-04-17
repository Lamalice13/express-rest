import { apiFetch } from "@monorepo/shared/client";

function patchPost(endpoint, options = "") {
  return apiFetch(`posts/${endpoint}`, { method: "PATCH", ...options });
}

function deletePost(endpoint) {
  apiFetch(`posts/${endpoint}`, { method: "DELETE" });
}

function createPost(options = "") {
  return apiFetch(`posts`, { method: "POST", ...options });
}

export { patchPost, deletePost, createPost };
