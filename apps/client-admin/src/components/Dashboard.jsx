import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";
import { patchPost, deletePost } from "../api/posts";
import { TailSpin } from "react-loader-spinner";

export function Dashboard() {
  const [posts, setPosts] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
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

  async function handlePatchText(post) {
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
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  }

  function handleSave(post) {
    setEditingId(null);
    if (!draft.trim()) {
      return;
    }
    if (draft !== post.text) {
      console.log(draft);
      return handlePatchText(post);
    }
  }

  function startEditing(post) {
    setEditingId(post.id);
    setDraft(post.text);
  }

  function handleKeydown(e, post) {
    if (e.key === "Escape") {
      setEditingId(null);
    } else if (e.key === "Enter") {
      handleSave(post);
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
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
              <div key={post.id}>
                <p>{post.published ? "Published" : "Unpublished"}</p>
                <h1>{post.title}</h1>
                {editingId !== post.id ? (
                  <p onClick={() => startEditing(post)}>{post.text}</p>
                ) : (
                  <input
                    type='text'
                    value={draft}
                    onBlur={() => handleSave(post)}
                    onKeyDown={(e) => handleKeydown(e, post)}
                    onChange={(e) => setDraft(e.target.value)}
                    autoFocus
                  />
                )}
                <p>{post.user.username}</p>
                <p>{post.timestamp}</p>

                {buttonLoading === post.id ? (
                  <TailSpin
                    height='40'
                    width='40'
                    color='#4fa94d'
                    ariaLabel='tail-spin-loading'
                  />
                ) : (
                  <button type='button' onClick={() => handlePublish(post.id)}>
                    {post.published ? "Unpublished it" : "Published it"}
                  </button>
                )}
                <br />
                <button type='button' onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
