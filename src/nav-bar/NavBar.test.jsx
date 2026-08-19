import { render } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import { NavBar } from "./NavBar";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

const example = [
  {
    quantity: 1,
  },
  {
    quantity: 2,
  },
];

function TestShop() {
  return <h1>Shop</h1>;
}

function TestHome() {
  return <h1>Home</h1>;
}

function TestCart() {
  return <h1>Cart</h1>;
}

describe("NavBar component test", () => {
  it("UI test", () => {
    render(
      <MemoryRouter>
        <NavBar cartProducts={example} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Shopee" })).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Quantity of products in cart is/),
    ).toHaveTextContent("3");
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
  });
  it("routing test", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "home",
              element: <TestHome />,
            },
            {
              path: "shop",
              element: <TestShop />,
            },
            {
              path: "cart",
              element: <TestCart />,
            },
          ],
        },
      ],
      { initialEntries: ["/home"] },
    );

    render(<RouterProvider router={router} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const shopLink = screen.getByRole("link", { name: "Shop" });
    const cartLink = screen.getByRole("link", { name: "Cart" });

    await user.click(cartLink);

    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();

    await user.click(homeLink);

    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.queryByText("heading", { name: "Cart" }),
    ).not.toBeInTheDocument();

    await user.click(shopLink);

    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Home" }),
    ).not.toBeInTheDocument();
  });
});
