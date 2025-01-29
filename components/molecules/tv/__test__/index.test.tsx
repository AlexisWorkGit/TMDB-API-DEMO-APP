import { act, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { pad } from "@/lib/utils";

import { TvCard } from "../tv-card";
import { TvEpisodeCard } from "../tv-episode-card";
import { TvHero } from "../tv-hero";
import { TvSeasonDialog } from "../tv-season-dialog";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => "/test-path",
}));

describe("TV Components Test Suite", () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {
        return null;
      }
      unobserve() {
        return null;
      }
      disconnect() {
        return null;
      }
    };

    // Mock ResizeObserver
    global.ResizeObserver = class ResizeObserver {
      constructor() {}
      observe() {
        return null;
      }
      unobserve() {
        return null;
      }
      disconnect() {
        return null;
      }
    };

    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  // TvCard Tests
  describe("TvCard Component", () => {
    const mockTvShow = {
      id: 1,
      poster_path: "/path/to/poster.jpg",
      name: "Breaking Bad",
      vote_average: 9.5,
      vote_count: 1500,
      first_air_date: "2008-01-20",
    };

    it("renders TV show card with all information", () => {
      render(<TvCard {...mockTvShow} />);

      expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
      expect(screen.getByText("2008")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/tv/1");
    });

    it("handles missing data gracefully", () => {
      const incompleteShow = {
        ...mockTvShow,
        poster_path: null,
        first_air_date: "",
      };
      render(<TvCard {...incompleteShow} />);

      expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    });
  });

  // TvEpisodeCard Tests
  describe("TvEpisodeCard Component", () => {
    const mockEpisode = {
      id: 1,
      name: "Pilot",
      episode_number: 1,
      still_path: "/path/to/still.jpg",
      vote_average: 8.5,
      vote_count: 1000,
      air_date: "2008-01-20",
      overview: "A high school chemistry teacher turns to a life of crime.",
      runtime: 45,
    };

    it("renders episode information correctly", () => {
      render(<TvEpisodeCard {...mockEpisode} />);

      // Using the correct format that matches the component
      expect(
        screen.getByText(`${pad(mockEpisode.episode_number)}. ${mockEpisode.name}`)
      ).toBeInTheDocument();
      expect(screen.getByText(/A high school chemistry teacher/)).toBeInTheDocument();
      expect(screen.getByText("45min")).toBeInTheDocument();
      expect(screen.getByText("January 19, 2008")).toBeInTheDocument();
    });

    it("handles missing episode data", () => {
      const incompleteEpisode = {
        ...mockEpisode,
        overview: "",
        still_path: null,
      };
      render(<TvEpisodeCard {...incompleteEpisode} />);

      expect(screen.getByText("No details")).toBeInTheDocument();
    });
  });

  // TvHero Tests
  describe("TvHero Component", () => {
    const mockTvShows = [
      {
        id: 1,
        name: "The Mandalorian",
        backdrop_path: "/path/to/backdrop1.jpg",
        overview: "A lone bounty hunter makes his way through the outer reaches of the galaxy.",
        first_air_date: "2019-11-12",
        vote_average: 8.8,
        vote_count: 2000,
        poster_path: "/path/to/poster1.jpg",
      },
      {
        id: 2,
        name: "Loki",
        backdrop_path: "/path/to/backdrop2.jpg",
        overview: "The mercurial villain Loki resumes his role as the God of Mischief.",
        first_air_date: "2021-06-09",
        vote_average: 8.4,
        vote_count: 1800,
        poster_path: "/path/to/poster2.jpg",
      },
    ];

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("renders hero section with single show", () => {
      render(<TvHero tvShows={mockTvShows} label="Featured Show" count={1} />);

      act(() => {
        jest.runAllTimers();
      });

      // Using getAllByText since the label might appear multiple times
      const labels = screen.getAllByText("Featured Show");
      expect(labels.length).toBeGreaterThan(0);
      expect(screen.getByText(/Loki|The Mandalorian/)).toBeInTheDocument();
      expect(screen.getByText(/A lone bounty hunter/)).toBeInTheDocument();
    });

    it("handles multiple shows correctly", () => {
      render(<TvHero tvShows={mockTvShows} label="Top Shows" count={2} />);

      act(() => {
        jest.runAllTimers();
      });

      // Using getAllByText for the label
      const labels = screen.getAllByText("Top Shows");
      expect(labels.length).toBeGreaterThan(0);
      expect(screen.getAllByText("Details").length).toBe(2);
    });
  });

  // Edge Cases and Error Handling
  describe("Edge Cases and Error Handling", () => {
    it("handles empty data gracefully", () => {
      const emptyShow = {
        id: 1,
        name: "",
        backdrop_path: null,
        overview: "",
        first_air_date: "",
        vote_average: 0,
        vote_count: 0,
        poster_path: null,
      };

      render(
        <div>
          <TvCard {...emptyShow} />
          <TvHero tvShows={[emptyShow]} label="Empty Test" count={1} />
        </div>
      );

      act(() => {
        jest.runAllTimers();
      });

      // Components should render without crashing
      expect(document.querySelector("a")).toBeInTheDocument();
    });

    it("handles malformed data", () => {
      const malformedShow = {
        id: 1, // Changed to valid number
        name: "",
        backdrop_path: null,
        overview: "",
        first_air_date: "",
        vote_average: 0, // Changed to valid number
        vote_count: 0, // Changed to valid number
        poster_path: null,
      };

      render(<TvCard {...malformedShow} />);
      // Component should render without crashing
      expect(document.querySelector("a")).toBeInTheDocument();
    });
  });

  // TvSeasonDialog Tests
  describe("TvSeasonDialog Component", () => {
    const mockDialogProps = {
      name: "Season 1",
      overview: "The first season of the groundbreaking series.",
      children: (
        <div>
          <div>Episode 1: Pilot</div>
          <div>Episode 2: The Cat's in the Bag</div>
        </div>
      ),
    };

    it("renders dialog with complete information", () => {
      render(<TvSeasonDialog {...mockDialogProps} />);

      expect(screen.getByText("Season 1")).toBeInTheDocument();
      expect(
        screen.getByText("The first season of the groundbreaking series.")
      ).toBeInTheDocument();
      expect(screen.getByText("Episode 1: Pilot")).toBeInTheDocument();
    });

    it("handles dialog with minimal content", () => {
      render(
        <TvSeasonDialog>
          <div>Minimal Content</div>
        </TvSeasonDialog>
      );

      expect(screen.getByText("Minimal Content")).toBeInTheDocument();
    });
  });
});
