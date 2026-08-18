import { Link } from "react-router";
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  return (
    <div className={styles.error_container}>
      <div className={styles.error_content}>
        <h1 className={styles.error_title}>
          Looks like you are lost, Shopee.{" "}
        </h1>
        <Link className={styles.link} to="/home">
          Head back home
        </Link>
      </div>
    </div>
  );
}
