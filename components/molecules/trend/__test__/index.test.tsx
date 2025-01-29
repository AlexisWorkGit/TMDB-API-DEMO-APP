import React from "react";
import { render, screen } from "@testing-library/react";

import { TrendCarousel } from "@/components/molecules/trend/trend-carousel";
import { TrendList } from "@/components/molecules/trend/trend-list";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock the TMDB API
jest.mock("@/lib/tmdb/api", () => ({
  tmdb: {
    trending: {
      movie: jest.fn(),
      tv: jest.fn(),
      people: jest.fn(),
    },
  },
}));

// Mock the Carousel components
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock child components
jest.mock("@/components/molecules/list", () => ({
  ListPagination: () => <div data-testid="list-pagination">Pagination</div>,
}));

jest.mock("@/components/molecules/movie", () => ({
  MovieCard: () => <div data-testid="movie-card">Movie Card</div>,
}));

jest.mock("@/components/molecules/tv", () => ({
  TvCard: () => <div data-testid="tv-card">TV Card</div>,
}));

jest.mock("@/components/molecules/person", () => ({
  PersonCard: () => <div data-testid="person-card">Person Card</div>,
}));

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  buttonVariants: () => "button-class",
}));

describe("Trend Components", () => {
  const mockItems = [
    { id: 1, title: "Test Movie", media_type: "movie" },
    { id: 2, title: "Test TV Show", media_type: "tv" },
    { id: 3, name: "Test Person", media_type: "person" },
  ];

  describe("TrendCarousel", () => {
    const carouselProps = {
      type: "movie" as const,
      items: mockItems,
      title: "Trending Movies",
      link: "/trending/movies",
    };

    it("renders carousel with title and explore link", () => {
      render(<TrendCarousel {...carouselProps} />);
      expect(screen.getByText("Trending Movies")).toBeInTheDocument();
      expect(screen.getByText("Explore more")).toBeInTheDocument();
    });

    it("renders carousel without explore link when not provided", () => {
      render(<TrendCarousel {...carouselProps} link={undefined} />);
      expect(screen.queryByText("Explore more")).not.toBeInTheDocument();
    });

    it("renders correct number of items", () => {
      render(<TrendCarousel {...carouselProps} />);
      const movieCards = screen.getAllByTestId("movie-card");
      const tvCards = screen.getAllByTestId("tv-card");
      const personCards = screen.getAllByTestId("person-card");

      const totalCards = movieCards.length + tvCards.length + personCards.length;
      expect(totalCards).toBe(mockItems.length);
    });
  });

  describe("TrendList", () => {
    const listProps = {
      type: "movie" as const,
      time: "day" as const,
      page: "1",
      title: "Trending Movies",
      description: "Popular trending movies",
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (require("@/lib/tmdb/api").tmdb.trending.movie as jest.Mock).mockResolvedValue({
        results: mockItems,
        total_pages: 10,
        page: 1,
      });
    });

    it("renders list with title and description", async () => {
      render(await TrendList(listProps));
      expect(screen.getByText("Trending Movies")).toBeInTheDocument();
      expect(screen.getByText("Popular trending movies")).toBeInTheDocument();
    });

    it("renders pagination", async () => {
      render(await TrendList(listProps));
      expect(screen.getByTestId("list-pagination")).toBeInTheDocument();
    });

    it("renders correct media type cards", async () => {
      render(await TrendList(listProps));
      const movieCards = screen.getAllByTestId("movie-card");
      const tvCards = screen.getAllByTestId("tv-card");
      const personCards = screen.getAllByTestId("person-card");

      const totalCards = movieCards.length + tvCards.length + personCards.length;
      expect(totalCards).toBe(mockItems.length);
    });

    it("handles empty results", async () => {
      const notFound = require("next/navigation").notFound;
      (require("@/lib/tmdb/api").tmdb.trending.movie as jest.Mock).mockResolvedValue({
        results: [],
        total_pages: 0,
        page: 1,
      });

      await TrendList(listProps);
      expect(notFound).toHaveBeenCalled();
    });

    it("makes API call with correct parameters", async () => {
      const trendingMovie = require("@/lib/tmdb/api").tmdb.trending.movie;
      await TrendList(listProps);

      expect(trendingMovie).toHaveBeenCalledWith({
        time: "day",
        page: "1",
      });
    });
  });
});
