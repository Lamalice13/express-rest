import { apiFetch } from "@monorepo/shared/client";

function patchPost(params, data) {
  return apiFetch(`posts/${params}`, { method: "PATCH", ...data });
}

function deletePost(params) {
  apiFetch(`posts/${params}`, { method: "DELETE" });
}

function createPost(data) {
  return apiFetch(`posts`, { method: "POST", ...data });
}

export { patchPost, deletePost, createPost };
