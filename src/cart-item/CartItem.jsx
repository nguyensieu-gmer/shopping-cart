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
      <img src={item.image} alt="cart's product" />
      <p>{item.title}</p>
      <div className={styles.fineTunning}>
        {item.quantity === 1 ? (
          <button onClick={hanleDeleteProduct}>
            <i className="ri-delete-bin-line"></i>
          </button>
        ) : (
          <button onClick={decreaseProductQuantity}>
            <i className="ri-subtract-line"></i>
          </button>
        )}
        <p>{item.quantity}</p>
        <button onClick={increaseProductQuantity}>
          <i className="ri-add-line"></i>
        </button>
      </div>
      <p>{Number(item.price) * Number(item.quantity)}$</p>
    </li>
  );
}
