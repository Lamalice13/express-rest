import { useNavigate, NavLink } from "react-router";

export function Register() {
  const navigate = useNavigate();
  const BASE_URL = `https://${import.meta.env.VITE_BACKEND_HOST}`;

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);

    const res = await fetch(`${BASE_URL}/auth/register`, {
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
    <main className='bg-yellow-400 mt-10! text-center w-1/2 mx-auto! rounded-2xl p-10!'>
      <h1 className='text-2xl mb-5!'>Please, sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' />

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />

        <button type='submit'>Send</button>
        <NavLink to='/' className='italic mt-5'>
          Log in here
        </NavLink>
      </form>
    </main>
  );
}
