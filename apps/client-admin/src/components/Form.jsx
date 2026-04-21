import { createPost } from "../api/posts";
import { useNavigate } from "react-router";

export function Form() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await createPost({ body: JSON.stringify(formData) });
    console.log(res);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      navigate("/form");
    }
  }

  return (
    <main className='bg-yellow-400 mt-10! text-center w-1/2 mx-auto! rounded-2xl p-10!'>
      <h1 className='text-3xl  mb-5!'>Create your post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <label htmlFor='title'>Title</label>
        <input required type='text' name='title' id='title' />

        <label htmlFor='text'>Texte</label>
        <input required type='text' name='text' id='text' />
        <button type='submit'>Create</button>
      </form>
    </main>
  );
}
