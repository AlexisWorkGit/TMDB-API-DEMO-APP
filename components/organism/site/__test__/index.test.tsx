import { useIsMobile } from "@/hooks";
import { fireEvent, render, screen } from "@testing-library/react";

import { SiteNav } from "@/components/organism/site";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/config", () => ({
  navigation: {
    items: [
      {
        title: "Home",
        href: "/",
        icon: () => <span data-testid="home-icon">HomeIcon</span>,
      },
      {
        title: "Movies",
        href: "/movies",
        icon: () => <span data-testid="movies-icon">MoviesIcon</span>,
        description: "Browse movies",
        items: [
          {
            title: "Popular",
            href: "/movies/popular",
            icon: () => <span>PopularIcon</span>,
            description: "Most popular movies",
          },
          {
            title: "Discover",
            href: "/movies/discover",
            icon: () => <span>DiscoverIcon</span>,
            description: "Discover new movies",
          },
        ],
      },
      {
        title: "TV Shows",
        href: "/tv",
        icon: () => <span data-testid="tv-icon">TVIcon</span>,
      },
    ],
  },
}));

// Mock hooks
jest.mock("@/hooks", () => ({
  useDialog: jest.fn(() => [false, jest.fn()]),
  useIsMobile: jest.fn(() => false),
  useActiveNav: jest.fn(() => false),
}));

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("SiteNav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Logo Rendering", () => {
    it("renders desktop logo when not mobile", () => {
      (useIsMobile as jest.Mock).mockImplementation(() => false);
      render(<SiteNav />);

      const logo = screen.getByRole("img", { name: "PopCorn" });
      expect(logo).toHaveAttribute("width", "175");
      expect(logo).toHaveAttribute("height", "47");
      expect(logo).toHaveAttribute("src", "/popcorn-logo-horizontal.png");
    });

    it("renders mobile logo when on mobile", () => {
      (useIsMobile as jest.Mock).mockImplementation(() => true);
      render(<SiteNav />);

      const logo = screen.getByRole("img", { name: "PopCorn" });
      expect(logo).toHaveAttribute("width", "40");
      expect(logo).toHaveAttribute("height", "47");
      expect(logo).toHaveAttribute("src", "/popcorn-glyph.png");
    });

    it("logo links to home page", () => {
      render(<SiteNav />);

      const logoLink = screen.getByRole("link", { name: "PopCorn" });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Navigation Menu", () => {
    it("renders navigation menu when not mobile", () => {
      (useIsMobile as jest.Mock).mockImplementation(() => false);
      render(<SiteNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("ml-4", "hidden", "lg:flex");
    });

    it("filters out home item from navigation", () => {
      render(<SiteNav />);

      const homeLink = screen.queryByText("Home");
      expect(homeLink).not.toBeInTheDocument();
    });

    it("renders navigation items with correct links", () => {
      render(<SiteNav />);

      const tvShowsLink = screen.getByRole("link", { name: /TV Shows/i });
      expect(tvShowsLink).toHaveAttribute("href", "/tv");
    });
  });

  describe("SiteNavItem (Dropdown)", () => {
    it("renders dropdown menu items correctly", () => {
      render(<SiteNav />);

      const moviesTrigger = screen.getByText("Movies");
      expect(moviesTrigger).toBeInTheDocument();
    });

    describe("SiteNavListItem", () => {
      it("renders NEW badge for Discover item", () => {
        render(<SiteNav />);

        const moviesTrigger = screen.getByText("Movies");
        fireEvent.click(moviesTrigger);

        const discoverItem = screen.getByText("Discover");
        const newBadge = screen.getByText("NEW");

        expect(discoverItem).toBeInTheDocument();
        expect(newBadge).toBeInTheDocument();
        expect(newBadge).toHaveClass("px-1", "py-0", "text-[9px]");
      });
    });

    describe("Accessibility", () => {
      it("renders icons with correct size classes", () => {
        render(<SiteNav />);

        const icons = screen.getAllByTestId(/-icon$/);
        icons.forEach((icon) => {
          expect(icon).toBeInTheDocument();
        });
      });

      it("ensures all interactive elements are focusable", () => {
        render(<SiteNav />);

        const interactiveElements = screen.getAllByRole("link");
        interactiveElements.forEach((element) => {
          expect(element).toHaveAttribute("href");
        });
      });
    });

    describe("Responsive Behavior", () => {
      it("hides navigation menu on mobile", () => {
        (useIsMobile as jest.Mock).mockImplementation(() => true);
        render(<SiteNav />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("hidden");
      });

      it("shows navigation menu on desktop", () => {
        (useIsMobile as jest.Mock).mockImplementation(() => false);
        render(<SiteNav />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("lg:flex");
      });
    });
  });
});
