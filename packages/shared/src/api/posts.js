import { apiFetch } from "./client";

function getAllPosts(data) {
  return apiFetch("posts", data);
}

export { getAllPosts };
