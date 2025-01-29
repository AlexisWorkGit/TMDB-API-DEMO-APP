import React from "react";
import { render, screen } from "@testing-library/react";

import { UserAvatar } from "./user-avatar";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean props to strings to avoid warnings
    const modifiedProps = {
      ...props,
      unoptimized: props.unoptimized?.toString(),
      fill: props.fill?.toString(),
      priority: props.priority?.toString(),
    };
    return <img {...modifiedProps} />;
  },
}));

// Mock the tmdb utils
jest.mock("@/lib/tmdb/utils", () => ({
  tmdbImage: {
    profile: jest.fn((path, size) => `https://mock-url.com/${path}/${size}`),
  },
}));

describe("UserAvatar", () => {
  it("renders Image component when image prop is provided", () => {
    render(<UserAvatar image="/test-image.jpg" alt="Test avatar" size="w45" />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test avatar");
    expect(image).toHaveAttribute("src", "https://mock-url.com//test-image.jpg/w45");
  });

  it("renders fallback with Logo when no image is provided", () => {
    render(<UserAvatar alt="Test avatar" data-testid="fallback-div" />);

    const fallbackDiv = screen.getByTestId("fallback-div");
    expect(fallbackDiv).toBeInTheDocument();
    expect(fallbackDiv).toHaveClass(
      "size-full",
      "rounded-full",
      "bg-muted",
      "text-muted-foreground"
    );
  });

  it("applies custom className correctly", () => {
    const customClass = "custom-class";
    render(<UserAvatar image="/test-image.jpg" alt="Test avatar" className={customClass} />);

    const image = screen.getByRole("img");
    expect(image).toHaveClass(customClass);
  });

  it("passes priority prop to Image component", () => {
    render(<UserAvatar image="/test-image.jpg" alt="Test avatar" priority={true} />);

    const image = screen.getByRole("img");
    // Check if the priority attribute exists with value "true"
    expect(image).toHaveAttribute("priority", "true");
  });

  it("uses default size when size prop is not provided", () => {
    render(<UserAvatar image="/test-image.jpg" alt="Test avatar" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://mock-url.com//test-image.jpg/w45");
  });

  it("passes additional props to the root element", () => {
    render(<UserAvatar alt="Test avatar" data-testid="custom-test-id" />);

    const element = screen.getByTestId("custom-test-id");
    expect(element).toBeInTheDocument();
  });
});
