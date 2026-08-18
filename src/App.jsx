import { Outlet } from "react-router";
import { NavBar } from "./nav-bar/NavBar";
import { useState } from "react";
import style from "./App.module.css";

export function App() {
  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <div className={style.app_container}>
      <NavBar cartProducts={cartProducts} />
      <Outlet
        context={{ products, setProducts, cartProducts, setCartProducts }}
      />
    </div>
  );
}
