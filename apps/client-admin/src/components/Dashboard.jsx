import { useEffect, useState } from "react";
import { getAllPosts } from "@monorepo/shared/posts";
import { patchPost, deletePost } from "../api/posts";

export function Dashboard() {
  const [posts, setPosts] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await getAllPosts();
      const data = await res.json();

      setPosts(data.posts);
    }
    fetchData();
  }, []);

  async function handlePublish(id) {
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
