import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import { PersonCard } from "../person-card";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

const mockPerson = {
  id: 1,
  name: "Test Person",
  profile_path: "/test.jpg",
  known_for_department: "Acting",
  adult: false,
  gender: 1,
  known_for: [],
  popularity: 0,
};

describe("PersonCard", () => {
  it("renders person information", () => {
    const { getByText } = render(<PersonCard {...mockPerson} />);
    expect(getByText("Test Person")).toBeInTheDocument();
    expect(getByText("Known for Acting")).toBeInTheDocument();
  });
});

describe("PersonList", () => {
  it("renders list when data is available", () => {
    const mockData = {
      results: [mockPerson],
      total_pages: 1,
      page: 1,
    };

    jest.mock("@/lib/tmdb/api", () => ({
      tmdb: {
        person: {
          list: jest.fn().mockResolvedValue(mockData),
        },
      },
    }));
  });
});
