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
      <h2 aria-label={`Name of product is ${title}`}>{title}</h2>
      <h1 aria-label={`Price of product is ${price} dollars`}>{price}$</h1>
      {product === undefined ? (
        <button onClick={handleAddproductIntoCart}>Add to cart</button>
      ) : (
        <div>
          {product.quantity === 1 ? (
            <button
              aria-label="remove product out of cart"
              onClick={hanleDeleteProduct}
            >
              <i aria-hidden="true" className="ri-delete-bin-line"></i>
            </button>
          ) : (
            <button
              aria-label="decrease quantity"
              onClick={decreaseProductQuantity}
            >
              <i aria-hidden="true" className="ri-subtract-line"></i>
            </button>
          )}
          <p
            aria-label={`Quantity of products in out cart is ${product.quantity}`}
          >
            {product.quantity}
          </p>
          <button
            aria-label="increase quantity"
            onClick={increaseProductQuantity}
          >
            <i aria-hidden="true" className="ri-add-line"></i>
          </button>
        </div>
      )}
    </li>
  );
}
