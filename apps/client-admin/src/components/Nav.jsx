import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to='/' end>
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink to='/register'>Sign up</NavLink>
          </li>
          <li onClick={handleLogout}>
            <button type='button' onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
