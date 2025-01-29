import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { SearchInput } from "./search-input";

// Mock the useSearch hook
const mockHandleChange = jest.fn();
const mockHandleKeyDown = jest.fn();
const mockClearSearch = jest.fn();

jest.mock("@/hooks", () => ({
  useSearch: () => ({
    term: "",
    handleChange: mockHandleChange,
    handleKeyDown: mockHandleKeyDown,
    clearSearch: mockClearSearch,
  }),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchInput placeholder="Custom search" />);
    const input = screen.getByPlaceholderText("Custom search");
    expect(input).toBeInTheDocument();
  });

  it("handles input change", () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("handles key down events", () => {
    const handleKeyDown = jest.fn();
    render(<SearchInput onKeyDown={handleKeyDown} />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<SearchInput className="custom-class" />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input.className).toContain("custom-class");
  });
});
