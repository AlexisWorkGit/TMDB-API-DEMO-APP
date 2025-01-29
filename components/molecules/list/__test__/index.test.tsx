import { usePathname, useSearchParams } from "next/navigation";
import { usePagination } from "@/hooks";
import { render, screen } from "@testing-library/react";

import { ListPagination } from "../list-pagination";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the usePagination hook
jest.mock("@/hooks", () => ({
  usePagination: jest.fn(),
}));

describe("ListPagination", () => {
  const mockUsePagination = usePagination as jest.Mock;

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/movies");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    // Default mock implementation
    mockUsePagination.mockReturnValue({
      numbers: [1, 2, 3],
      prevLink: "/movies?page=1",
      nextLink: "/movies?page=3",
      pageLink: (page: number | string) => `/movies?page=${page}`,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation when there are multiple pages", () => {
    render(<ListPagination currentPage={2} totalPages={3} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("shows navigation buttons when on middle page", () => {
    render(<ListPagination currentPage={2} totalPages={3} />);

    const prevButton = screen.getByRole("link", { name: /previous/i });
    const nextButton = screen.getByRole("link", { name: /next/i });

    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute("href", "/movies?page=1");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("href", "/movies?page=3");
  });

  it("hides previous button on first page", () => {
    render(<ListPagination currentPage={1} totalPages={3} />);
    expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
  });

  it("hides next button on last page", () => {
    render(<ListPagination currentPage={3} totalPages={3} />);
    expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
  });

  it("limits total pages to 500", () => {
    render(<ListPagination currentPage={1} totalPages={1000} />);

    expect(mockUsePagination).toHaveBeenCalledWith({
      currentPage: 1,
      totalPages: 500,
    });
  });

  it("marks current page as active", () => {
    render(<ListPagination currentPage={2} totalPages={3} />);

    const pageLinks = screen
      .getAllByRole("link")
      .filter((link) => !link.textContent?.match(/previous|next/i));
    const currentPageLink = pageLinks[1]; // Second link should be page 2
    expect(currentPageLink).toHaveAttribute("aria-current", "page");
  });

  it("generates correct href for page links", () => {
    render(<ListPagination currentPage={2} totalPages={3} />);

    const pageLinks = screen
      .getAllByRole("link")
      .filter((link) => !link.textContent?.match(/previous|next/i));

    expect(pageLinks[0]).toHaveAttribute("href", "/movies?page=1");
    expect(pageLinks[1]).toHaveAttribute("href", "/movies?page=2");
    expect(pageLinks[2]).toHaveAttribute("href", "/movies?page=3");
  });

  it("handles single page case", () => {
    mockUsePagination.mockReturnValue({
      numbers: [],
      prevLink: "",
      nextLink: "",
      pageLink: (page: number | string) => `/movies?page=${page}`,
    });

    render(<ListPagination currentPage={1} totalPages={1} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies mobile-specific classes to navigation buttons", () => {
    render(<ListPagination currentPage={2} totalPages={3} />);

    const prevButton = screen.getByRole("link", { name: /previous/i });
    const nextButton = screen.getByRole("link", { name: /next/i });

    expect(prevButton).toHaveClass("hidden", "md:flex");
    expect(nextButton).toHaveClass("hidden", "md:flex");
  });
});
