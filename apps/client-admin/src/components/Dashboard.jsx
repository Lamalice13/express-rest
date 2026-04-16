import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";
import { patchPost } from "../api/posts";

export function Dashboard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPosts({ method: "GET" });
      setPosts(data.posts);
    }
    fetchData();
  }, []);

  async function handlePublish(id) {
    const data = await patchPost(id, { method: "PATCH" });
    const isPublished = data.published;
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return { ...post, published: isPublished };
        }
        return post;
      }),
    );
  }
  console.log(posts);

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.published ? "Published" : "Unpublished"}</p>
              <p>{post.text}</p>
              <p>{post.user.username}</p>
              <p>{post.timestamp}</p>
              <button type='button' onClick={() => handlePublish(post.id)}>
                Publish it
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}
