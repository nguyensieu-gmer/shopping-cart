import styles from "./ShopError.module.css";
export function ShopError({ error }) {
  return (
    <div className={styles.error_container}>
      <div className={styles.error_content}>
        <h1>some thing wrong here</h1>
        <p>{error}</p>
      </div>
    </div>
  );
}
