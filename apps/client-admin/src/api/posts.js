import { apiFetch } from "./client";

function patchPost(params, data) {
  return apiFetch(`posts/${params}`, data);
}

function deletePost(params, data) {
  return apiFetch(`posts/${params}`, data);
}

function createPost(data) {
  return apiFetch(`posts`, data);
}

function getAllPosts(data) {
  return apiFetch(`posts`, data);
}

export { patchPost, deletePost, createPost, getAllPosts };
