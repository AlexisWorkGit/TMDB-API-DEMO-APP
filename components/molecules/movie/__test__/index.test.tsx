import React from "react";
import { useDialog } from "@/hooks";
import { fireEvent, render, screen } from "@testing-library/react";

import { DetailedCollection, Movie } from "@/lib/tmdb/models";
import { format } from "@/lib/tmdb/utils";
import { formatValue } from "@/lib/utils";

import { MovieCard } from "../movie-card";
import { MovieCollectionDialog } from "../movie-collection-dialog";

import "@testing-library/jest-dom";

import { MovieHero } from "../movie-hero";

// Mock the Next.js Link component
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});
jest.mock("../../media/media-backdrop", () => ({
  MediaBackdrop: ({ image, alt }: { image: string; alt: string }) => (
    <div data-testid="media-backdrop" data-image={image} data-alt={alt} />
  ),
}));

// Mock the hooks
jest.mock("@/hooks", () => ({
  useDialog: jest.fn(),
}));

describe("MovieCard", () => {
  const mockMovie: Movie = {
    id: 1,
    poster_path: "/sample-poster.jpg",
    title: "Test Movie",
    vote_average: 8.5,
    vote_count: 1000,
    release_date: "2023-01-01",
    overview: "",
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    original_language: "en",
    original_title: "",
    popularity: 0,
    video: false,
  };

  it("renders movie information correctly", () => {
    render(<MovieCard {...mockMovie} />);

    // Check if the movie title is rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // Check if the release year is rendered
    expect(screen.getByText(formatValue(mockMovie.release_date, format.year))).toBeInTheDocument();

    // Check if the link is correct
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/movie/${mockMovie.id}`);

    // Check if the movie poster is rendered with correct alt text
    const poster = screen.getByAltText(mockMovie.title);
    expect(poster).toBeInTheDocument();
  });

  it("renders with missing poster path", () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: "",
    };

    render(<MovieCard {...movieWithoutPoster} />);

    // Component should still render without poster
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("displays rating information", () => {
    render(<MovieCard {...mockMovie} />);

    // Check if rating information is displayed
    const ratingButton = screen.getByRole("button");
    const ratingValue = screen.getByText("8.5");

    expect(ratingButton).toBeInTheDocument();
    expect(ratingValue).toBeInTheDocument();
  });
});

describe("MovieCollectionDialog", () => {
  const mockCollection: DetailedCollection = {
    name: "Test Collection",
    overview: "Test Overview",
    parts: [
      {
        id: 1,
        title: "Movie 1",
        overview: "Overview 1",
        backdrop_path: "/backdrop1.jpg",
        poster_path: "/poster1.jpg",
        release_date: "2021-01-01",
      },
      {
        id: 2,
        title: "Movie 2",
        overview: "Overview 2",
        backdrop_path: "/backdrop2.jpg",
        poster_path: "/poster2.jpg",
        release_date: "2022-01-01",
      },
    ],
  };

  const mockUseDialog = {
    open: false,
    setOpen: jest.fn(),
  };

  beforeEach(() => {
    (useDialog as jest.Mock).mockReturnValue([mockUseDialog.open, mockUseDialog.setOpen]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the trigger button", () => {
    render(<MovieCollectionDialog collection={mockCollection} />);
    expect(screen.getByText("View The Collection")).toBeInTheDocument();
  });

  it("displays collection name in dialog", () => {
    (useDialog as jest.Mock).mockReturnValue([true, mockUseDialog.setOpen]);
    render(<MovieCollectionDialog collection={mockCollection} />);
    expect(screen.getByText("Test Collection")).toBeInTheDocument();
  });

  it("displays collection overview in dialog", () => {
    (useDialog as jest.Mock).mockReturnValue([true, mockUseDialog.setOpen]);
    render(<MovieCollectionDialog collection={mockCollection} />);
    expect(screen.getByText("Test Overview")).toBeInTheDocument();
  });

  it("renders all movies in the collection", () => {
    (useDialog as jest.Mock).mockReturnValue([true, mockUseDialog.setOpen]);
    render(<MovieCollectionDialog collection={mockCollection} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Overview 1")).toBeInTheDocument();
    expect(screen.getByText("Overview 2")).toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked", () => {
    render(<MovieCollectionDialog collection={mockCollection} />);

    fireEvent.click(screen.getByText("View The Collection"));
    expect(mockUseDialog.setOpen).toHaveBeenCalledWith(true);
  });

  it("creates correct movie links", () => {
    (useDialog as jest.Mock).mockReturnValue([true, mockUseDialog.setOpen]);
    render(<MovieCollectionDialog collection={mockCollection} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/movie/1");
    expect(links[1]).toHaveAttribute("href", "/movie/2");
  });

  it("sorts movies by release date", () => {
    const unsortedCollection: DetailedCollection = {
      ...mockCollection,
      parts: [
        {
          ...mockCollection.parts[0],
          release_date: "2022-01-01",
        },
        {
          ...mockCollection.parts[1],
          release_date: "2021-01-01",
        },
      ],
    };

    (useDialog as jest.Mock).mockReturnValue([true, mockUseDialog.setOpen]);
    render(<MovieCollectionDialog collection={unsortedCollection} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/movie/2"); // Earlier release date should be first
    expect(links[1]).toHaveAttribute("href", "/movie/1");
  });
});

describe("MovieHero", () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Test Movie",
      overview: "Test Overview",
      backdrop_path: "/test-path.jpg",
      poster_path: "/poster-path.jpg",
      release_date: "2024-01-01",
      vote_average: 8.5,
      vote_count: 100,
      popularity: 100,
      genre_ids: [1, 2],
    },
    {
      id: 2,
      title: "Test Movie 2",
      overview: "Test Overview 2",
      backdrop_path: "/test-path-2.jpg",
      poster_path: "/poster-path-2.jpg",
      release_date: "2024-01-02",
      vote_average: 7.5,
      vote_count: 200,
      popularity: 90,
      genre_ids: [3, 4],
    },
  ];

  it("renders correct number of movies based on count prop", () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    render(<MovieHero movies={mockMovies} label="Test Label" count={2} />);

    const movieTitles = screen.getAllByRole("heading");
    expect(movieTitles).toHaveLength(2);
  });

  it("renders badge with correct label", () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    render(<MovieHero movies={mockMovies} label="Custom Label" />);

    expect(screen.getByText("Custom Label")).toHaveClass("select-none");
  });
});
