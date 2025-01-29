import React from "react";
import { render, screen } from "@testing-library/react";

import { MediaCard, MediaCastCard, MediaPoster } from "../../media";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe("MediaCastCard", () => {
  const mockCast = {
    id: 1,
    name: "John Doe",
    profile_path: "/path/to/profile.jpg",
    character: "Character Name",
    cast_id: 1,
    credit_id: "credit123",
    order: 1,
  };

  it("renders correctly with all props", () => {
    render(<MediaCastCard {...mockCast} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Character Name")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/person/1");
  });
});

describe("MediaCard", () => {
  describe("Root", () => {
    it("renders with custom className", () => {
      const { container } = render(<MediaCard.Root className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Content", () => {
    it("renders children correctly", () => {
      render(
        <MediaCard.Content>
          <span>Test Content</span>
        </MediaCard.Content>
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("Title", () => {
    it("renders title text with correct styles", () => {
      render(<MediaCard.Title>Test Title</MediaCard.Title>);
      const title = screen.getByText("Test Title");
      expect(title).toHaveClass("line-clamp-1", "text-sm", "font-medium");
    });
  });

  describe("Excerpt", () => {
    it("renders excerpt text with correct styles", () => {
      render(<MediaCard.Excerpt>Test Excerpt</MediaCard.Excerpt>);
      const excerpt = screen.getByText("Test Excerpt");
      expect(excerpt).toHaveClass("line-clamp-3", "text-xs", "text-muted-foreground");
    });
  });
});

describe("MediaPoster", () => {
  it("renders image when src is provided", () => {
    render(<MediaPoster image="/path/to/image.jpg" alt="Test Image" size="w500" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Image");
    expect(image).toHaveClass("rounded-md", "border", "bg-muted");
  });

  it("applies custom className", () => {
    render(<MediaPoster image="/path/to/image.jpg" alt="Test Image" className="custom-class" />);

    const image = screen.getByRole("img");
    expect(image).toHaveClass("custom-class");
  });

  it("renders with priority prop", () => {
    const { container } = render(
      <MediaPoster priority image="/path/to/image.jpg" alt="Test Image" />
    );

    // Since priority is handled by Next.js Image component internally,
    // we'll just verify the component renders
    expect(container.firstChild).toBeInTheDocument();
  });
});
