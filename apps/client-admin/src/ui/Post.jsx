import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export function Post({ post, isButtonLoading, onPublish, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.text);

  function handleSave() {
    setIsEditing(false);
    if (!draft.trim() || draft === post.text) return;
    onSave(post, draft);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") setIsEditing(false);
    if (e.key === "Enter") handleSave();
  }

  function startEditing() {
    setDraft(post.text);
    setIsEditing(true);
  }

  return (
    <div className='bg-black text-amber-50 p-5 rounded-2xl shadow-[8px_10px_1px_rgba(0,0,0,1)]! flex flex-col'>
      <p>{post.user.username}</p>
      <p>{post.published ? "Published" : "Unpublished"}</p>
      <h1 className='text-center text-3xl'>{post.title}</h1>

      {isEditing ? (
        <input
          type='text'
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className='text-xl text-justify w-1/2' onClick={startEditing}>
          {post.text}
        </p>
      )}

      <p>{post.timestamp}</p>

      {isButtonLoading ? (
        <TailSpin
          height='40'
          width='40'
          color='#4fa94d'
          ariaLabel='tail-spin-loading'
        />
      ) : (
        <button type='button' onClick={() => onPublish(post.id)}>
          {post.published ? "Unpublish it" : "Publish it"}
        </button>
      )}

      <br />
      <button type='button' onClick={() => onDelete(post.id)}>
        Delete
      </button>
    </div>
  );
}
