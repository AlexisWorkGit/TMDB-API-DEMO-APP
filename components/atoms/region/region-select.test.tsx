import React from "react";
import { regions } from "@/lib";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useToast } from "@/hooks/use-toast";
import { setRegion } from "@/app/actions";

import { RegionSelect } from "./region-select";

jest.mock("@/app/actions", () => {
  return {
    setRegion: jest.fn(),
  };
});

jest.mock("@/hooks/use-toast", () => {
  return {
    useToast: jest.fn(),
  };
});

const mockToast = jest.fn();

describe("RegionSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("renders the select component", () => {
    render(<RegionSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("displays all regions in the dropdown", () => {
    render(<RegionSelect />);

    // Open dropdown
    fireEvent.click(screen.getByRole("combobox"));

    regions.forEach((region) => {
      expect(screen.getByText(region.english_name)).toBeInTheDocument();
    });
  });

  it("calls setRegion and onValueChange when a region is selected", () => {
    const onValueChange = jest.fn();
    render(<RegionSelect onValueChange={onValueChange} />);

    // Open dropdown
    fireEvent.click(screen.getByRole("combobox"));

    // Select first region
    const firstRegion = regions[0];
    fireEvent.click(screen.getByText(firstRegion.english_name));

    expect(setRegion).toHaveBeenCalledWith(firstRegion.iso_3166_1);
    expect(onValueChange).toHaveBeenCalledWith(firstRegion.iso_3166_1);
  });

  it("shows a toast notification after region change", async () => {
    const firstRegion = regions[0];
    render(<RegionSelect />);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText(firstRegion.english_name));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Region changed successfully",
        description: `You have successfully changed your region to ${firstRegion.english_name}`,
      });
    });
  });

  it("renders country flags for each region", () => {
    render(<RegionSelect />);

    fireEvent.click(screen.getByRole("combobox"));

    const flags = screen.getAllByRole("img");
    expect(flags).toHaveLength(regions.length);
  });
});
