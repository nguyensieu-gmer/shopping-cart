import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { Home } from "./Home";
import routes from "../Routes";

window.fetch = vi.fn(() => {
  const user = [
    {
      category: "men's clothing",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      id: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      price: 109.95,
      rating: { count: 120, rate: 3.9 },
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    },
  ];

  return Promise.resolve({ ok: true, json: () => Promise.resolve(user) });
});

describe("Home Testing", () => {
  it("UI testing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText(/hi there/i)).toBeInTheDocument();
    expect(screen.getByRole("link"), { name: /shop now/i }).toBeInTheDocument();
  });
  it("routing test", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/home"] });

    render(<RouterProvider router={router} />);

    const link = await screen.findByRole("link", { name: /shop now/i });

    await user.click(link);

    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
  });
});
