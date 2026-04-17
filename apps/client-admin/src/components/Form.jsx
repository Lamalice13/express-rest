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
    <main>
      <h1>Create your post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input required type='text' name='title' id='title' />

        <label htmlFor='text'>Texte</label>
        <input required type='text' name='text' id='text' />
        <button type='submit'>Create</button>
      </form>
    </main>
  );
}
