import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ThemeToggle } from "./theme-toggle";

// Mock the Lucide icons
jest.mock("lucide-react", () => ({
  Sun: () => <div data-testid="sun-icon">Sun Icon</div>,
  Moon: () => <div data-testid="moon-icon">Moon Icon</div>,
  MonitorCog: () => <div data-testid="monitor-icon">Monitor Icon</div>,
}));

// Mock the useTheme hook from next-themes
const mockSetTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: "light",
    themes: ["light", "dark", "system"],
  }),
}));

// Mock the useToast hook
const mockToast = jest.fn();
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all theme buttons", () => {
    render(<ThemeToggle />);

    // Check if all theme buttons are rendered
    expect(screen.getByText(/light/i)).toBeInTheDocument();
    expect(screen.getByText(/dark/i)).toBeInTheDocument();
    expect(screen.getByText(/system/i)).toBeInTheDocument();
  });

  it("renders correct icons for each theme", () => {
    render(<ThemeToggle />);

    // Check if all icons are present
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    expect(screen.getByTestId("monitor-icon")).toBeInTheDocument();
  });

  it("applies correct button variants based on current theme", () => {
    render(<ThemeToggle />);

    const lightButton = screen.getByText(/light/i).closest("button");
    const darkButton = screen.getByText(/dark/i).closest("button");
    const systemButton = screen.getByText(/system/i).closest("button");

    // Light theme is active (from mock)
    expect(lightButton).not.toHaveClass("outline");
    expect(darkButton).toHaveClass("focus-visible:outline-none");
    expect(systemButton).toHaveClass("focus-visible:outline-none");
  });

  it("calls setTheme and shows toast when clicking a theme button", () => {
    render(<ThemeToggle />);

    // Click the dark theme button
    fireEvent.click(screen.getByText(/dark/i));

    // Check if setTheme was called with correct argument
    expect(mockSetTheme).toHaveBeenCalledWith("dark");

    // Check if toast was called with correct arguments
    expect(mockToast).toHaveBeenCalledWith({
      title: "Theme changed successfully",
      description: "You have successfully changed the theme to dark",
    });
  });

  it("handles system theme selection", () => {
    render(<ThemeToggle />);

    // Click the system theme button
    fireEvent.click(screen.getByText(/system/i));

    // Check if setTheme was called with correct argument
    expect(mockSetTheme).toHaveBeenCalledWith("system");

    // Check if toast was called with correct arguments
    expect(mockToast).toHaveBeenCalledWith({
      title: "Theme changed successfully",
      description: "You have successfully changed the theme to system",
    });
  });

  it("renders all themes from the themes array", () => {
    render(<ThemeToggle />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3); // light, dark, system

    const themes = ["light", "dark", "system"];
    themes.forEach((theme) => {
      expect(screen.getByText(new RegExp(theme, "i"))).toBeInTheDocument();
    });
  });
});
