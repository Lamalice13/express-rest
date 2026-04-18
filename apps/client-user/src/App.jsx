import { useEffect, useState } from "react";
import { postComment } from "@monorepo/shared/posts";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/posts?include=comment");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    fetchData();
  }, []);

  async function handleSubmitComment(postId, e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await postComment(postId, { body: JSON.stringify(formData) });

    if (res.ok) {
      const data = await res.json();
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId)
            return {
              ...post,
              comments: [...post.comments, data.comment],
            };
          return post;
        }),
      );
    }
  }

  return (
    <>
      <main>
        <h1>Posts</h1>
        {loading ? (
          <TailSpin
            height='80'
            width='80'
            color='#4fa94d'
            ariaLabel='tail-spin-loading'
          />
        ) : (
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
                  <br />
                  <h2 className='text-2xl'>Comments</h2>
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.text}</p>
                      <p>{comment.timestamp}</p>
                    </div>
                  ))}
                  <form
                    action='POST'
                    onSubmit={(e) => handleSubmitComment(post.id, e)}
                  >
                    <label htmlFor='comment'>Let a comment here</label>
                    <textarea name='text' id='comment'></textarea>
                    <button type='submit'>Send</button>
                  </form>
                </section>
              ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
