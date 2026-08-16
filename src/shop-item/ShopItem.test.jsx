import { describe, it, expect } from "vitest";
import { useState } from "react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";
import { ShopItem } from "./ShopItem";

function FakeShopOutlet() {
  const [cartProducts, setCartProducts] = useState([]);
  return <Outlet context={{ cartProducts, setCartProducts }} />;
}

const item = {
  category: "men's clothing",
  description: "lorem ipsum",
  id: 1,
  image: "example.jpg",
  price: 100,
  rating: { count: 120, rate: 3.9 },
  title: "Backpack",
};

describe("Test Shop component", () => {
  it("UI test", () => {
    const route = createMemoryRouter(
      [
        {
          path: "/",
          element: <FakeShopOutlet />,
          children: [{ path: "shopitem", element: <ShopItem item={item} /> }],
        },
      ],
      { initialEntries: ["/shopitem"] },
    );

    render(<RouterProvider router={route} />);
    screen.debug();
    expect(
      screen.getByLabelText("Name of product is Backpack"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Price of product is 100 dollars"),
    ).toBeInTheDocument();
    expect(screen.getByAltText("men's clothing")).toBeInTheDocument();
  });
});
