import { Shop } from "./shop/Shop";
import { Cart } from "./cart/Cart";
import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { Home } from "./home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default routes;
