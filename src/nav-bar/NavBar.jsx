import icon from "../assets/store_icon.png";
import { Link } from "react-router";
import styles from "./NavBar.module.css";

export function NavBar({ cartProducts }) {
  const totalProduct = cartProducts.reduce(
    (acc, current) => acc + current.quantity,
    0,
  );
  return (
    <div className={styles.nav_bar}>
      <div className={styles.logo_section}>
        <img aria-hidden="true" src={icon} alt="store's icon" />
        <h1>Shopee</h1>
      </div>
      <div className={styles.links}>
        <Link to="home">Home</Link>
        <Link to="shop">Shop</Link>
        <div>
          <Link data-testid="cart_link" to="cart">
            Cart
          </Link>
          <span aria-label={`Quantity of products in cart is ${totalProduct}`}>
            {totalProduct === 0 ? "" : totalProduct}
          </span>
        </div>
      </div>
    </div>
  );
}
