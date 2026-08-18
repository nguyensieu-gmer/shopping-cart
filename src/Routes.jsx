import { Shop } from "./shop/Shop";
import { Cart } from "./cart/Cart";
import { App } from "./App";
import { Home } from "./home/Home";
import { ErrorPage } from "./ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
];

export default routes;
