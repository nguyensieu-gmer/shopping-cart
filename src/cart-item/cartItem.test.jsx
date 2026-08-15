import { useState } from "react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { describe, it, expect } from "vitest";
import { CartItem } from "./CartItem";
import { render, screen } from "@testing-library/react";

const item = {
  id: 1,
  image: "example.jpg",
  category: "dep",
  title: "T-shirt",
  quantity: 1,
  price: 100,
};

function TestWrapper({ sample }) {
  const [cartProducts, setCartProducts] = useState(sample);

  return <Outlet context={{ cartProducts, setCartProducts }} />;
}

describe("test Cart component", () => {
  it("UI test", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TestWrapper sample={[item]} />,
          children: [
            {
              path: "cart_item",
              element: <CartItem item={item} />,
            },
          ],
        },
      ],
      { initialEntries: ["/cart_item"] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByAltText("dep")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "remove product out of cart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("T-shirt")).toBeInTheDocument();
    expect(screen.getByLabelText("1 product in cart")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "increase quantity of product" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Price 100 dollars")).toHaveTextContent(
      "100$",
    );
  });
});
