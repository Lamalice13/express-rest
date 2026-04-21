import { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export function Nav() {
  const navigate = useNavigate();
  const [isConnected] = useState(() => {
    localStorage.getItem("token");
  });

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <header className='bg-yellow-400 p-5!'>
      <nav>
        <ul className='flex justify-end gap-10'>
          <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/form'>Create a post</NavLink>
          </li>
          {isConnected && (
            <>
              <li>
                <NavLink to='/' end>
                  Log in
                </NavLink>
              </li>
              <li onClick={handleLogout}>
                <button type='button' onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
