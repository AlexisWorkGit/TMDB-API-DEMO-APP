import React from "react";
import { render } from "@testing-library/react";

import { GridBg } from "./grid-bg";

describe("GridBg", () => {
  it("should render the SVG element", () => {
    render(<GridBg />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "100%");
    expect(svg).toHaveAttribute("height", "100%");
  });

  it("should contain the required pattern definitions", () => {
    render(<GridBg />);
    const defs = document.querySelector("defs");
    expect(defs).toBeInTheDocument();

    const smallGrid = document.querySelector("#smallGrid");
    expect(smallGrid).toBeInTheDocument();
    expect(smallGrid).toHaveAttribute("width", "8");
    expect(smallGrid).toHaveAttribute("height", "8");

    const grid = document.querySelector("#grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute("width", "80");
    expect(grid).toHaveAttribute("height", "80");
  });

  it("should render the gradient overlay div", () => {
    render(<GridBg />);
    const overlay = document.querySelector(".bg-gradient-to-t");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("absolute", "bottom-0", "h-[30dvh]", "w-full");
  });

  it("should have proper container styling", () => {
    render(<GridBg />);
    const container = document.querySelector(".absolute.top-0");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("h-dvh", "w-full", "text-muted");
  });

  it("should render the main rect with grid pattern", () => {
    render(<GridBg />);
    const rect = document.querySelector("svg > rect");
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute("width", "100%");
    expect(rect).toHaveAttribute("height", "100%");
    expect(rect).toHaveAttribute("fill", "url(#grid)");
  });
});
