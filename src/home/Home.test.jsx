import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { Home } from "./Home";
import { App } from "../App";

function ShopTest() {
  return <h1>Shop</h1>;
}

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
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            { path: "home", element: <Home /> },
            {
              path: "shop",
              element: <ShopTest />,
            },
          ],
        },
      ],
      {
        initialEntries: ["/home"],
      },
    );

    render(<RouterProvider router={router} />);

    const link = await screen.findByRole("link", { name: /shop now/i });

    await user.click(link);

    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
  });
});
