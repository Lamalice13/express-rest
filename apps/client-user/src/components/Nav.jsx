import { NavLink } from "react-router";

export function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to='http://localhost:5174'>Admin</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
