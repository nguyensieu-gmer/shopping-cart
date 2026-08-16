import { createMemoryRouter, RouterProvider } from "react-router";
import { vi, describe, expect, it } from "vitest";
import { App } from "../App";
import { Shop } from "./Shop";
import { Cart } from "../cart/Cart";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

window.fetch = vi.fn(() => {
  const user = [
    {
      category: "men's clothing",
      description: "Your perfect pack for everyday",
      id: 1,
      image: "example.jpg",
      price: 100,
      rating: { count: 120, rate: 3.9 },
      title: "Laptops bag",
    },
  ];

  return Promise.resolve({ ok: true, json: () => Promise.resolve(user) });
});

describe("test Shop component", () => {
  it("UI test", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "shop",
              element: <Shop />,
            },
          ],
        },
      ],
      { initialEntries: ["/shop"] },
    );
    render(<RouterProvider router={router} />);

    const loading = screen.getByTestId("loading_state");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByTestId("loading_state"));

    expect(screen.getByText("Laptops bag")).toBeInTheDocument();
  });
  it("Add to cart testing action", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "shop",
              element: <Shop />,
            },
          ],
        },
      ],
      { initialEntries: ["/shop"] },
    );
    render(<RouterProvider router={router} />);

    await waitForElementToBeRemoved(screen.getByTestId("loading_state"));

    const AddToCartBTN = screen.getByRole("button", { name: "Add to cart" });

    await user.click(AddToCartBTN);

    expect(
      screen.getByRole("button", { name: "remove product out of cart" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "increase quantity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Quantity of products in out cart is 1"),
    ).toBeInTheDocument();
  });
  it("increase and decrease BTN test", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "shop",
              element: <Shop />,
            },
          ],
        },
      ],
      { initialEntries: ["/shop"] },
    );

    render(<RouterProvider router={router} />);
    await waitForElementToBeRemoved(screen.getByTestId("loading_state"));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    for (let i = 0; i < 2; i++) {
      await user.click(
        screen.getByRole("button", { name: "increase quantity" }),
      );
    }

    expect(
      screen.getByLabelText("Quantity of products in out cart is 3"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "decrease quantity" }));

    expect(
      screen.getByLabelText("Quantity of products in out cart is 2"),
    ).toBeInTheDocument();
  });
  it("remove out of cart product BTN", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "shop",
              element: <Shop />,
            },
          ],
        },
      ],
      { initialEntries: ["/shop"] },
    );

    render(<RouterProvider router={router} />);
    await waitForElementToBeRemoved(screen.getByTestId("loading_state"));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(
      screen.getByRole("button", { name: "remove product out of cart" }),
    );

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });
  it("test the synchronous of Shop and Cart component", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            { path: "shop", element: <Shop /> },
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
      { initialEntries: ["/shop"] },
    );

    render(<RouterProvider router={router} />);
    await waitForElementToBeRemoved(screen.getByTestId("loading_state"));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByText("Laptops bag")).toBeInTheDocument();
  });
});
