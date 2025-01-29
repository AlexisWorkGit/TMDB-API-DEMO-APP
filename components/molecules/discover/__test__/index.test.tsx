import { useFilters } from "@/hooks";
import { fireEvent, render, screen } from "@testing-library/react";

import { DiscoverFilters } from "../discover-filters";

jest.mock("@/hooks", () => ({
  useFilters: jest.fn(),
}));

jest.mock("@/components/molecules/discover", () => ({
  DiscoverFilterDate: () => <div data-testid="filter-date">Date Filter</div>,
  DiscoverFilterGenre: () => <div data-testid="filter-genre">Genre Filter</div>,
  DiscoverFilterLang: () => <div data-testid="filter-lang">Language Filter</div>,
  DiscoverFilterProvider: () => <div data-testid="filter-provider">Provider Filter</div>,
  DiscoverFilterVoteAverage: () => <div data-testid="filter-vote-average">Vote Average Filter</div>,
  DiscoverFilterVoteCount: () => <div data-testid="filter-vote-count">Vote Count Filter</div>,
}));

describe("DiscoverFilters", () => {
  const mockProps = {
    type: "movie" as const,
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ],
    providers: [
      { provider_id: 1, provider_name: "Netflix", logo_path: "/path" },
      { provider_id: 2, provider_name: "Amazon", logo_path: "/path" },
    ],
  };

  const mockUseFilters = {
    count: 0,
    getFilter: jest.fn(),
    setFilter: jest.fn(),
    saveFilters: jest.fn(),
    clearFilters: jest.fn(),
  };

  beforeEach(() => {
    (useFilters as jest.Mock).mockReturnValue(mockUseFilters);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<DiscoverFilters {...mockProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("displays filter count when filters are active", () => {
    (useFilters as jest.Mock).mockReturnValue({
      ...mockUseFilters,
      count: 2,
    });

    render(<DiscoverFilters {...mockProps} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls clearFilters when clear button is clicked", () => {
    render(<DiscoverFilters {...mockProps} />);

    fireEvent.click(screen.getByText("Filters"));

    fireEvent.click(screen.getByText("Clear"));
    expect(mockUseFilters.clearFilters).toHaveBeenCalled();
  });

  it("calls saveFilters when save changes button is clicked", () => {
    render(<DiscoverFilters {...mockProps} />);

    fireEvent.click(screen.getByText("Filters"));

    fireEvent.click(screen.getByText("Save Changes"));
    expect(mockUseFilters.saveFilters).toHaveBeenCalled();
  });

  it("renders all filter components", () => {
    render(<DiscoverFilters {...mockProps} />);

    fireEvent.click(screen.getByText("Filters"));

    expect(screen.getByTestId("filter-genre")).toBeInTheDocument();
    expect(screen.getByTestId("filter-lang")).toBeInTheDocument();
    expect(screen.getByTestId("filter-provider")).toBeInTheDocument();
    expect(screen.getByTestId("filter-vote-average")).toBeInTheDocument();
    expect(screen.getByTestId("filter-vote-count")).toBeInTheDocument();
  });
});
