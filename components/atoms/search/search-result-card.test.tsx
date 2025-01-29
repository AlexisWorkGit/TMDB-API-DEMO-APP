import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import React from "react";

import { SearchResultCard } from "./search-result-card";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("SearchResultCard", () => {
  it("renders a movie card with correct content", () => {
    const movie = {
      id: 1,
      media_type: "movie",
      title: "Test Movie",
      poster_path: "/test.jpg",
      vote_average: 8.5,
      vote_count: 100,
      release_date: "2023-01-01",
    };

    render(<SearchResultCard media={movie} />);

    // Check link
    expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/1");

    // Check content
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("movie")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    // Check if any year is present
    expect(screen.getByText(/^\d{4}$/)).toBeInTheDocument();

    // Check image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Movie");
    expect(image).toHaveAttribute("src", expect.stringContaining("/test.jpg"));
  });

  it("renders a TV show card with correct content", () => {
    const tvShow = {
      id: 2,
      media_type: "tv",
      name: "Test Show",
      poster_path: "/test.jpg",
      vote_average: 8.5,
      vote_count: 100,
      first_air_date: "2023-01-01",
    };

    render(<SearchResultCard media={tvShow} />);

    // Check link
    expect(screen.getByRole("link")).toHaveAttribute("href", "/tv/2");

    // Check content
    expect(screen.getByText("Test Show")).toBeInTheDocument();
    expect(screen.getByText("TV Show")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    // Check if any year is present
    expect(screen.getByText(/^\d{4}$/)).toBeInTheDocument();

    // Check image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Show");
    expect(image).toHaveAttribute("src", expect.stringContaining("/test.jpg"));
  });

  it("renders a person card with correct content", () => {
    const person = {
      id: 3,
      media_type: "person",
      name: "Test Person",
      profile_path: "/test.jpg",
      known_for_department: "Acting",
    };

    render(<SearchResultCard media={person} />);

    // Check link
    expect(screen.getByRole("link")).toHaveAttribute("href", "/person/3");

    // Check content
    expect(screen.getByText("Test Person")).toBeInTheDocument();
    expect(screen.getByText("person")).toBeInTheDocument();
    expect(screen.getByText("Known for Acting")).toBeInTheDocument();

    // Check image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Person");
    expect(image).toHaveAttribute("src", expect.stringContaining("/test.jpg"));

    // Person cards shouldn't have ratings
    expect(screen.queryByText("8.5")).not.toBeInTheDocument();
  });

  it("renders fallback UI when image is missing", () => {
    const movieWithoutPoster = {
      id: 4,
      media_type: "movie",
      title: "No Poster Movie",
      poster_path: null,
      vote_average: 8.5,
      vote_count: 100,
      release_date: "2023-01-01",
    };

    const { container } = render(<SearchResultCard media={movieWithoutPoster} />);

    // Check if title is rendered
    expect(screen.getByText("No Poster Movie")).toBeInTheDocument();

    // Check if the fallback container is rendered with the correct classes
    expect(container.querySelector(".size-full.rounded-md.border.bg-muted")).toBeInTheDocument();

    // Check if the SVG icon is rendered
    expect(container.querySelector(".lucide-popcorn")).toBeInTheDocument();

    // The img element should not be present
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("handles missing dates", () => {
    const movieWithoutDate = {
      id: 5,
      media_type: "movie",
      title: "No Date Movie",
      poster_path: "/test.jpg",
      vote_average: 8.5,
      vote_count: 100,
      release_date: "",
    };

    render(<SearchResultCard media={movieWithoutDate} />);
    expect(screen.getByText("No Date Movie")).toBeInTheDocument();
  });
});
