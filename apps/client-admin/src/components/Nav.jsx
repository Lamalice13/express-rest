import { NavLink } from "react-router";

export function Nav() {
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
        </ul>
      </nav>
    </header>
  );
}
