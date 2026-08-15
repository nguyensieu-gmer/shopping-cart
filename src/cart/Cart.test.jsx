import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { Cart } from "./Cart";
import { useState } from "react";

const product1Item = [
  {
    id: 1,
    title: "T-Shirt",
    price: 50,
    image: "test.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "Backpack",
    price: 100,
    image: "test.jpg",
    quantity: 2,
  },
];

function TestWrapper({ product }) {
  const [cartProducts, setCartProducts] = useState(product);
  return <Outlet context={{ cartProducts, setCartProducts }} />;
}

describe("Cart testing", () => {
  it("UI testing with empty props", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TestWrapper product={[]} />,
          children: [{ path: "cart", element: <Cart /> }],
        },
      ],
      { initialEntries: ["/cart"] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading"), {
      name: "Your cart empty now",
    }).toBeInTheDocument();
    expect(
      screen.getByText("Add something to get started"),
    ).toBeInTheDocument();
  });
  it("UI test with fake data", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TestWrapper product={product1Item} />,
          children: [{ path: "cart", element: <Cart /> }],
        },
      ],
      { initialEntries: ["/cart"] },
    );

    render(<RouterProvider router={router} />);

    screen.debug();

    expect(screen.getByText("Backpack")).toBeInTheDocument();
    expect(screen.getByText("T-Shirt")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: 250.00$")).toBeInTheDocument();
    expect(screen.getByText("Shipping: 0$")).toBeInTheDocument();
    expect(screen.getByText("total: 250$")).toBeInTheDocument();
  });

  it("deleting product test", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TestWrapper product={product1Item} />,
          children: [
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
      { initialEntries: ["/cart"] },
    );
    render(<RouterProvider router={router} />);

    const button1 = screen.getByRole("button", {
      name: "remove product out of cart",
    });

    await user.click(button1);

    expect(screen.queryByText("T-Shirt")).not.toBeInTheDocument();
  });
});
