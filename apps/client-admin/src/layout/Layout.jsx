import { Nav } from "../components/Nav";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
