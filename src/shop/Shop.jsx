import { useEffect, useState } from "react";
import { ShopItem } from "../shop-item/ShopItem";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router";

// product's example
/*
  category: "men's clothing",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  price: 109.95,
  rating: { count: 120, rate: 3.9 },
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
*/

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

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      {products ? (
        <ul className={styles.list}>
          {products.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <h1 data-testid="loading_state">Loading...</h1>
      )}
    </div>
  );
}
