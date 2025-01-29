import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InfoTooltip } from "./info-tooltip";

describe("InfoTooltip", () => {
  it("renders the info icon", () => {
    render(<InfoTooltip>Tooltip content</InfoTooltip>);

    const infoIcon = screen.getByRole("button");
    expect(infoIcon).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    const tooltipText = "Test tooltip content";
    render(<InfoTooltip>{tooltipText}</InfoTooltip>);

    const trigger = screen.getByRole("button");
    await userEvent.hover(trigger);

    const tooltipContents = await screen.findAllByText(tooltipText);
    expect(tooltipContents.length).toBeGreaterThan(0);
    expect(tooltipContents[0]).toBeInTheDocument();
  });
});
