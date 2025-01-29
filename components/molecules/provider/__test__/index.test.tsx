import React from "react";
import { render, screen } from "@testing-library/react";

import { ProviderLogo } from "../provider-logo";
import { ProviderTable } from "../provider-table";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Icons component
jest.mock("@/components/atoms/icons", () => ({
  Icons: {
    Logo: () => <div data-testid="icons-logo">MockedLogo</div>,
  },
}));

// Mock tmdb utils
jest.mock("@/lib/tmdb/utils", () => ({
  tmdbImage: {
    logo: (path: string, size: string) => `https://mock-tmdb.com${path}?size=${size}`,
  },
}));

describe("ProviderLogo", () => {
  it("should render fallback when no image is provided", () => {
    render(<ProviderLogo alt="Test Provider" />);
    expect(screen.getByTestId("icons-logo")).toBeInTheDocument();
  });

  it("should render image when provided", () => {
    render(<ProviderLogo image="/test-image.jpg" alt="Test Provider" />);
    const img = screen.getByAltText("Test Provider");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://mock-tmdb.com/test-image.jpg?size=w154");
  });

  it("should apply custom className", () => {
    const { container } = render(<ProviderLogo alt="Test Provider" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

describe("ProviderTable", () => {
  const mockProviders = [
    {
      provider_id: 1,
      provider_name: "Netflix",
      logo_path: "/netflix.jpg",
    },
    {
      provider_id: 2,
      provider_name: "Prime",
      logo_path: "/prime.jpg",
    },
  ];

  it("should render providers list", () => {
    render(<ProviderTable title="Stream" providers={mockProviders} />);

    expect(screen.getByText("Stream")).toBeInTheDocument();
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.getByText("Prime")).toBeInTheDocument();
  });

  it("should show not available message when no providers", () => {
    render(<ProviderTable title="Stream" providers={[]} />);

    expect(screen.getByText("Not available")).toBeInTheDocument();
  });

  it("should render with different titles", () => {
    const { rerender } = render(<ProviderTable title="Stream" providers={mockProviders} />);
    expect(screen.getByText("Stream")).toBeInTheDocument();

    rerender(<ProviderTable title="Buy" providers={mockProviders} />);
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });
});
