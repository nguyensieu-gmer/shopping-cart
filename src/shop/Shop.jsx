import { useEffect, useState } from "react";
import { ShopItem } from "../shop-item/ShopItem";
import styles from "./Shop.module.css";

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

const useShopData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDataForShop = async () => {
      try {
        const res = await fetchShopData("https://fakestoreapi.com/products");
        setData(res);
        setError(null);
      } catch (e) {
        if (e.name === "AbortError") {
          setError(e.name);
        } else {
          setError(e.message);
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForShop();

    return controller.abort();
  }, [setData, setLoading, setError, data]);

  return { data, error, loading };
};

export function Shop() {
  let { data, error, loading } = useShopData();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <ul className={styles.list}>
        {data && data.map((item) => <ShopItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}
