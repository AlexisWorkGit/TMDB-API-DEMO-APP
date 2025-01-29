import React from "react";
import { render, screen } from "@testing-library/react";

import { format } from "@/lib/tmdb/utils";

import { SkeletonReviewCard, UserReviewCard } from "./user-review-card";

// Mock the modules
jest.mock("@/lib/tmdb/utils", () => ({
  format: {
    date: jest.fn((date) => "Formatted Date"),
    content: jest.fn((content) => "Formatted Content"),
  },
}));

// Mock the entire UserAvatar component instead of the image utility
jest.mock("@/components/atoms/user", () => ({
  UserAvatar: ({ alt }: { alt: string }) => <img alt={alt} src="mock-avatar.jpg" />,
}));

// Mock the MediaRating component
jest.mock("@/components/molecules/media", () => ({
  MediaRating: ({ average }: { average: number }) => <div>Rating: {average}</div>,
}));

describe("UserReviewCard", () => {
  const mockReview = {
    author: "John Doe",
    author_details: {
      name: "John Doe",
      avatar_path: "/avatar.jpg",
      username: "johndoe",
      rating: 8.5,
    },
    created_at: "2024-01-01",
    content: "This is a review content",
  };

  it("renders review information correctly", () => {
    render(<UserReviewCard review={mockReview} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("Formatted Date")).toBeInTheDocument();
    expect(screen.getByText("Formatted Content")).toBeInTheDocument();
    expect(screen.getByText("Rating: 8.5")).toBeInTheDocument();
  });

  it("renders avatar with correct props", () => {
    render(<UserReviewCard review={mockReview} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("alt", "John Doe");
    expect(avatar).toHaveAttribute("src", "mock-avatar.jpg");
  });

  it("formats date and content using format utility", () => {
    render(<UserReviewCard review={mockReview} />);

    expect(format.date).toHaveBeenCalledWith("2024-01-01");
    expect(format.content).toHaveBeenCalledWith("This is a review content");
  });
});

describe("SkeletonReviewCard", () => {
  it("renders skeleton elements", () => {
    const { container } = render(<SkeletonReviewCard />);

    const skeletons = container.getElementsByClassName("animate-pulse");
    expect(skeletons.length).toBe(7);
  });

  it("maintains the same structure as UserReviewCard", () => {
    const { container } = render(<SkeletonReviewCard />);

    expect(container.querySelector(".grid-cols-\\[auto\\,1fr\\]")).toBeInTheDocument();
    expect(container.querySelector(".md\\:row-span-2")).toBeInTheDocument();
    expect(container.querySelector(".md\\:col-start-2")).toBeInTheDocument();
  });
});
