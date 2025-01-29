import { render, screen } from "@testing-library/react";

import { VideoCard } from "../video-card";

// Mock next/image since it's not available in test environment
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
jest.mock("@/lib/tmdb/api", () => ({
  tmdb: {
    movie: {
      videos: jest.fn(),
    },
    tv: {
      videos: jest.fn(),
    },
  },
}));
describe("VideoCard", () => {
  const mockProps = {
    name: "Test Video",
    ytKey: "test123",
  };

  it("renders video card with correct name", () => {
    render(<VideoCard {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("renders with correct thumbnail image", () => {
    render(<VideoCard {...mockProps} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", mockProps.name);
    expect(image).toHaveAttribute("src", expect.stringContaining(mockProps.ytKey));
  });

  it("renders play circle icon", () => {
    render(<VideoCard {...mockProps} />);
    // Since PlayCircle is an SVG icon, we can check for its presence by its positioning class
    expect(document.querySelector(".absolute.left-1\\/2.top-1\\/2")).toBeInTheDocument();
  });

  it("applies additional className when provided", () => {
    const customClass = "custom-class";
    render(<VideoCard {...mockProps} className={customClass} />);
    expect(screen.getByRole("img").parentElement).toHaveClass(customClass);
  });
});
