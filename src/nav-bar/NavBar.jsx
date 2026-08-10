import icon from "../assets/store_icon.png";
import { Link } from "react-router";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <div className={styles.nav_bar}>
      <div className={styles.logo_section}>
        <img src={icon} alt="store's icon" />
        <h1>Shop</h1>
      </div>
      <div className={styles.links}>
        <Link to="home">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </div>
    </div>
  );
}
