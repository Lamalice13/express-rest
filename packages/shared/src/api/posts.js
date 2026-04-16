import { apiFetch } from "./client";

function getAllPosts() {
  return apiFetch("posts", { method: "GET" });
}

export { getAllPosts };
