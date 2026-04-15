import { useNavigate } from "react-router";

export function Register() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  }

  return (
    <main>
      <h1>Please, sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' />

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />

        <button type='submit'>Send</button>
      </form>
    </main>
  );
}
