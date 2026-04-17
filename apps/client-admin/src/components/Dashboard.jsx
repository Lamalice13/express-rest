import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";
import { patchPost, deletePost } from "../api/posts";

export function Dashboard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllPosts();
      const data = await res.json();

      setPosts(data.posts);
    }
    fetchData();
  }, []);

  console.log(posts);
  async function handlePublish(id) {
    const res = await patchPost(id);
    const data = await res.json();
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

  async function handleDelete(id) {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  }

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
                {post.published ? "Unpublished it" : "Published it"}
              </button>
              <br />
              <button type='button' onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}
