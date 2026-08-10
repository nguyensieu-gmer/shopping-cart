import { Outlet } from "react-router";
import { NavBar } from "./nav-bar/NavBar";

export function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
