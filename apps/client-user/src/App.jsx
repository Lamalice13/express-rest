import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Post } from "./ui/Post";

function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = `https://${import.meta.env.VITE_BACKEND_HOST}`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/posts?include=comment`);
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

  return (
    <>
      <main className='bg-yellow-400 mt-10! w-[85%] mx-auto! rounded-2xl p-10! h-auto'>
        <h1 className='text-3xl mb-10'>Posts</h1>
        {loading ? (
          <TailSpin
            height='80'
            width='80'
            color='#4fa94d'
            ariaLabel='tail-spin-loading'
          />
        ) : (
          <div>
            {posts?.length > 0 &&
              posts.map((post) => (
                <Post key={post.id} post={post} setPosts={setPosts} />
              ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
