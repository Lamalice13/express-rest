import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";

export function Dashboard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPosts({ method: "GET" });
      setPosts(data.posts);
    }
    fetchData();
  }, []);

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
              <button type='button'>Delete</button>
            </div>
          ))}
      </div>
    </main>
  );
}
