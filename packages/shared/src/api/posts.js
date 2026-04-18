import { apiFetch } from "./client";

function getAllPosts() {
  return apiFetch("posts", { method: "GET" });
}

function postComment(postId, options) {
  return apiFetch(`posts/${postId}/comments`, { method: "POST", ...options });
}

export { getAllPosts, postComment };
