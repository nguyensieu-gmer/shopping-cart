import styles from "./ShopItem.module.css";
import { useOutletContext } from "react-router";

export function ShopItem({ item }) {
  const { category, price, image, title, id } = item;
  const { cartProducts, setCartProducts } = useOutletContext();

  const product = cartProducts.find((i) => i.id === id);

  function decreaseProductQuantity() {
    setCartProducts((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : { ...i },
      ),
    );
  }

  function increaseProductQuantity() {
    setCartProducts((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity < 20
          ? { ...i, quantity: i.quantity + 1 }
          : { ...i, quantity: i.quantity },
      ),
    );
  }

  function hanleDeleteProduct() {
    setCartProducts((prev) => prev.filter((i) => i.id !== id));
  }

  function handleAddproductIntoCart() {
    setCartProducts((prev) => [
      ...prev,
      { id, image, title, price, quantity: 1 },
    ]);
  }

  return (
    <li className={styles.list}>
      <img src={image} alt={category} />
      <h2>{title}</h2>
      <h1>{price}$</h1>
      {product === undefined ? (
        <button onClick={handleAddproductIntoCart}>Add to cart</button>
      ) : (
        <div>
          {product.quantity === 1 ? (
            <button onClick={hanleDeleteProduct}>
              <i className="ri-delete-bin-line"></i>
            </button>
          ) : (
            <button onClick={decreaseProductQuantity}>
              <i className="ri-subtract-line"></i>
            </button>
          )}
          <p>{product.quantity}</p>
          <button onClick={increaseProductQuantity}>
            <i className="ri-add-line"></i>
          </button>
        </div>
      )}
    </li>
  );
}
