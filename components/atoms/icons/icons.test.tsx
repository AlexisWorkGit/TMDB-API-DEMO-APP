import React from "react";
import { render, screen } from "@testing-library/react";

import { Icons } from "./icons";

describe("Icons component", () => {
  test("renders Logo icon", () => {
    render(<Icons.Logo data-testid="logo-icon" />);
    const element = screen.getByTestId("logo-icon");
    expect(element).toBeDefined();
    expect(element).toBeTruthy();
  });

  test.each([
    { Icon: Icons.Github, name: "GitHub" },
    { Icon: Icons.Next, name: "Next.js" },
    { Icon: Icons.Tmdb, name: "The Movie Database" },
    { Icon: Icons.Shadcn, name: "shadcn/ui" },
    { Icon: Icons.Vercel, name: "Vercel" },
  ])("renders $name icon with correct attributes", ({ Icon, name }) => {
    render(<Icon data-testid={`${name}-icon`} />);
    const icon = screen.getByTestId(`${name}-icon`);

    expect(icon).toBeDefined();
    expect(icon).toBeTruthy();
    expect(icon.getAttribute("role")).toBe("img");
    expect(icon.querySelector("title")?.textContent).toBe(name);
  });

  test("renders Logo with role attribute", () => {
    render(<Icons.Logo role="img" />);
    const element = screen.getByRole("img");
    expect(element).toBeDefined();
  });
});
