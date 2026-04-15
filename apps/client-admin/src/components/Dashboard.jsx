import { useEffect, useState } from "react";

export function Dashboard() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/posts");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  console.log(posts);
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.text}</p>
              <p>{post.user.username}</p>
              <p>{post.timestamp}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
