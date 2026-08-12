import { Outlet } from "react-router";
import { NavBar } from "./nav-bar/NavBar";
import { useState } from "react";

export function App() {
  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <div>
      <NavBar cartProducts={cartProducts} />
      <Outlet
        context={{ products, setProducts, cartProducts, setCartProducts }}
      />
    </div>
  );
}
