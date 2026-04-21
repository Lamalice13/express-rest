import { usePost } from "@monorepo/shared/usePost";

export function Post({ post, isButtonLoading, onPublish, onDelete, onSave }) {
  const {
    isEditing,
    draft,
    setDraft,
    handleSave,
    handleKeyDown,
    startEditing,
  } = usePost(post, onPublish, onDelete, onSave);

  return (
    <div className='bg-black text-amber-50 p-10 rounded-2xl shadow-[8px_10px_1px_rgba(0,0,0,1)]! flex flex-col gap-5'>
      <div>
        <p>{post.user.username}</p>
        <p>{post.published ? "Published" : "Unpublished"}</p>
        <p>{new Date(post.timestamp).toISOString().split("T")[0]}</p>
      </div>

      <h1 className='text-3xl'>{post.title}</h1>

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
        <p className='text-md text-justify w-full' onClick={startEditing}>
          {post.text}
        </p>
      )}

      <div className='flex flex-col items-start mt-10 '>
        <button
          className='disabled:cursor-not-allowed! disabled:text-gray-700c'
          type='button'
          disabled={isButtonLoading}
          onClick={() => onPublish(post.id)}
        >
          {post.published ? "Unpublish it" : "Publish it"}
        </button>

        <button type='button' onClick={() => onDelete(post.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
