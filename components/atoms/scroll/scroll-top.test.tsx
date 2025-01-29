import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { ScrollTop } from "./scroll-top";

describe("ScrollTop component", () => {
  it("renders without crashing", () => {
    render(<ScrollTop />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("is initially hidden", () => {
    render(<ScrollTop />);
    expect(screen.getByRole("button")).toHaveClass("opacity-0");
  });

  it("becomes visible when scrolled down", () => {
    render(<ScrollTop />);
    fireEvent.scroll(window, { target: { scrollY: 200 } });
    expect(screen.getByRole("button")).toHaveClass("opacity-100");
  });

  it("scrolls to top when clicked", () => {
    window.scrollTo = jest.fn();
    render(<ScrollTop />);
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("removes scroll event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollTop />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
