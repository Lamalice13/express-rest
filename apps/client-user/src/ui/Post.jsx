import { postComment } from "@monorepo/shared/posts";
import { Comment } from "./Comment";

export function Post({ post, setPosts }) {
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
    <div key={post.id}>
      <div className='bg-black text-amber-50 p-10 rounded-2xl shadow-[8px_10px_1px_rgba(0,0,0,1)]! flex flex-col gap-5'>
        <div>
          <p>{post.user.username}</p>
          <p>{new Date(post.timestamp).toISOString().split("T")[0]}</p>
        </div>

        <h1 className='text-3xl'>{post.title}</h1>

        <p className='text-md text-justify w-full'>{post.text}</p>
      </div>
      <form
        action='POST'
        onSubmit={(e) => handleSubmitComment(post.id, e)}
        className='w-full min-h-10 bg-yellow mt-10 p-10 flex'
      >
        <textarea
          name='text'
          id='comment'
          placeholder='Write your comment'
          className='w-1/3 focus:outline-0 resize-none'
        ></textarea>
        <button type='submit'>Comment</button>
      </form>
      {post?.comments?.length > 0 &&
        post.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
