import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }

  return (
    <main>
      <h1>Please, log in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />

        <button type='submit'>Send</button>
      </form>
    </main>
  );
}
