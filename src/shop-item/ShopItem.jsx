import styles from "./ShopItem.module.css";

export function ShopItem({ item }) {
  const { category, price, image, title } = item;
  return (
    <li className={styles.list}>
      <img src={image} alt={category} />
      <h2>{title}</h2>
      <h1>{price}$</h1>
      <button>Add to cart</button>
      <button>See options</button>
    </li>
  );
}
