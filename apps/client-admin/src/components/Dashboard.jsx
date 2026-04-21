import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";
import { patchPost, deletePost } from "../api/posts";
import { TailSpin } from "react-loader-spinner";
import { Post } from "../ui/Post";

export function Dashboard() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getAllPosts();
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
    fetchData();
  }, []);

  async function handlePublish(id) {
    setButtonLoading(id);
    try {
      const res = await patchPost(id);
      const data = await res.json();

      const isPublished = data.published;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            return { ...post, published: isPublished };
          }
          return post;
        }),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setButtonLoading(null), 1000);
    }
  }

  async function handleSave(post, draft) {
    const res = await patchPost(post.id, {
      body: JSON.stringify({ text: draft }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, text: draft } : p)),
      );
    }
  }

  async function handleDelete(id) {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className='bg-yellow-400 mt-10! w-[85%] mx-auto! rounded-2xl p-10! h-screen'>
      <h1 className='text-3xl mb-10'>Dashboard</h1>

      {loading ? (
        <TailSpin
          height='80'
          width='80'
          color='#4fa94d'
          ariaLabel='tail-spin-loading'
        />
      ) : (
        <div>
          {posts?.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                isButtonLoading={buttonLoading === post.id}
                onPublish={handlePublish}
                onDelete={handleDelete}
                onSave={handleSave}
              />
            ))
          ) : (
            <p className='text-2xl text-yellow-400'>No post available...</p>
          )}
        </div>
      )}
    </main>
  );
}
