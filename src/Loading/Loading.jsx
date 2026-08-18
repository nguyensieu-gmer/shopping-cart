import styles from "./Loading.module.css";
import spinnerImg from "../assets/loading.png";

export function Loading() {
  return (
    <div className={styles.loading_container}>
      <img className={styles.spinner} src={spinnerImg} alt="Loading" />
    </div>
  );
}
