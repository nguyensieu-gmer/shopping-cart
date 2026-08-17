import { Link } from "react-router";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.home_content}>
        <h1>Hi there! What are you looking for today?</h1>
        <div className={styles.link_container}>
          <Link className={styles.link} to="/shop">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
