import { Outlet } from "react-router";
import { NavBar } from "./nav-bar/NavBar";
import { useState } from "react";

export function App() {
  const [products, setProducts] = useState(null);
  return (
    <div>
      <NavBar />
      <Outlet context={{ products, setProducts }} />
    </div>
  );
}
