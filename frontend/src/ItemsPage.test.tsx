import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemsPage } from "./ItemsPage";
import * as itemsApi from "./api/items";

describe("ItemsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows list and Structure match: Yes when API returns items and sameStructure true", async () => {
    vi.spyOn(itemsApi, "compareStructureAndGetItems").mockResolvedValue({
      items: [{ id: "1", name: "Item 1" }],
      sameStructure: true,
    });

    render(<ItemsPage />);
    await screen.findByText("Structure match:");

    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("shows Structure match: No when sameStructure is false", async () => {
    vi.spyOn(itemsApi, "compareStructureAndGetItems").mockResolvedValue({
      sameStructure: false,
    });

    render(<ItemsPage />);
    await screen.findByText("Structure match:");

    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText(/Structure does not match/)).toBeInTheDocument();
  });
});
