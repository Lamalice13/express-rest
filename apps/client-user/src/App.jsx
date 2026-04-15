import { useEffect, useState } from "react";

function App() {
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

  return (
    <>
      <main>
        <h1>Posts</h1>
        <div>
          {posts &&
            posts.map((post) => (
              <section key={post.id + "-"}>
                <div key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.text}</p>
                  <p>{post.user.username}</p>
                  <p>{post.timestamp}</p>
                </div>

                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>{comment.timestamp}</p>
                  </div>
                ))}
              </section>
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
