import { useOutletContext } from "react-router";
import styles from "./CartItem.module.css";

export function CartItem({ item }) {
  const { setCartProducts } = useOutletContext();

  function decreaseProductQuantity() {
    setCartProducts((prev) =>
      prev.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : { ...i },
      ),
    );
  }

  function increaseProductQuantity() {
    setCartProducts((prev) =>
      prev.map((i) =>
        i.id === item.id && i.quantity < 20
          ? { ...i, quantity: i.quantity + 1 }
          : { ...i, quantity: i.quantity },
      ),
    );
  }

  function hanleDeleteProduct() {
    setCartProducts((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <li className={styles.cartItem}>
      <div className={styles.img_container}>
        <img className={styles.image} src={item.image} alt={item.category} />
      </div>
      <p className={styles.title}>{item.title}</p>
      <div className={styles.fineTunning}>
        {item.quantity === 1 ? (
          <button
            className={styles.fine_tune_btn}
            aria-label="remove product out of cart"
            onClick={hanleDeleteProduct}
          >
            <i aria-hidden="true" className="ri-delete-bin-line"></i>
          </button>
        ) : (
          <button
            className={styles.fine_tune_btn}
            aria-label="decrease quantity of product"
            onClick={decreaseProductQuantity}
          >
            <i aria-hidden="true" className="ri-subtract-line"></i>
          </button>
        )}
        <p
          aria-label={`${item.quantity} product${item.quantity > 1 ? "s" : ""} in cart`}
        >
          {item.quantity}
        </p>
        <button
          className={styles.fine_tune_btn}
          aria-label="increase quantity of product"
          onClick={increaseProductQuantity}
        >
          <i aria-hidden="true" className="ri-add-line"></i>
        </button>
      </div>
      <p
        aria-label={`Price ${Number(item.price) * Number(item.quantity)} dollars`}
      >
        {Number(item.price) * Number(item.quantity)}$
      </p>
    </li>
  );
}
