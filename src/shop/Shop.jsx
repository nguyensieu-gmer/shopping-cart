import { useEffect, useState } from "react";
import { ShopItem } from "../shop-item/ShopItem";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router";
import { ShopError } from "../shop-error-component/ShopError";
import { Loading } from "../Loading/Loading";

const fetchShopData = async (url, signal = null) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw Error(`HTTP error: Status: ${response.status}`);
  }

  return response.json();
};

const useShopData = ({ products, setProducts }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (products) return;
    const controller = new AbortController();

    const fetchDataForShop = async () => {
      try {
        const res = await fetchShopData(
          "https://fakestoreapi.com/products",
          controller.signal,
        );
        setProducts(res);
        setError(null);
      } catch (e) {
        if (e.name === "AbortError") {
          return;
        }
        setError(e.message);
        setProducts(null);
      }
    };

    fetchDataForShop();

    return () => controller.abort();
  }, [products, setProducts]);

  return { error };
};

export function Shop() {
  const { products, setProducts } = useOutletContext();
  const { error } = useShopData({ products, setProducts });

  if (error) return <ShopError error={error} />;

  return (
    <div>
      {products ? (
        <ul className={styles.list}>
          {products.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}
