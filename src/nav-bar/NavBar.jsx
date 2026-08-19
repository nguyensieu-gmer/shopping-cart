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
        <img
          className={styles.icon_image}
          aria-hidden="true"
          src={icon}
          alt="store's icon"
        />
        <h1>Shopee</h1>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} to="home">
          Home
        </Link>
        <Link className={styles.link} to="shop">
          Shop
        </Link>
        <div className={styles.cart_link}>
          <Link className={styles.link} aria-label="Cart" to="cart">
            <i className="ri-shopping-cart-2-line"></i>
          </Link>

          <p
            className={totalProduct > 0 ? styles.quantity : undefined}
            aria-label={`Quantity of products in cart is ${totalProduct}`}
          >
            {totalProduct === 0 ? "" : totalProduct}
          </p>
        </div>
      </div>
    </div>
  );
}
