import { useOutletContext } from "react-router";
import { CartItem } from "../cart-item/CartItem";
import styles from "./Cart.module.css";

export function Cart() {
  const { cartProducts } = useOutletContext();
  let shipping = 0;
  let subTotal = cartProducts.reduce((cur, item) => {
    return cur + item.quantity * item.price;
  }, 0);
  return cartProducts.length !== 0 ? (
    <div className={styles.cartContainer}>
      <ul className={styles.list}>
        {cartProducts.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div>
        <h1>Subtotal: {subTotal.toFixed(2)}$</h1>
        <h1>Shipping: {shipping}$</h1>
        <h1>total: {Number(subTotal.toFixed(2)) + Number(shipping)}$</h1>
      </div>
    </div>
  ) : (
    <div className={styles.empty}>
      <div className={styles.cart_empty_content}>
        <h1>Your cart empty now</h1>
        <p>Add something to get started</p>
      </div>
    </div>
  );
}
