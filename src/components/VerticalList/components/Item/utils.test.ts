import { describe, it, expect } from "vitest";
import { getDataId } from "./utils";

describe("getDataId", () => {
  it("returns parsed integer from data-id", () => {
    const element = document.createElement("div");
    element.setAttribute("data-id", "0");
    expect(getDataId(element)).toBe(0);
  });

  it("returns null for invalid data-id", () => {
    const element = document.createElement("div");
    element.setAttribute("data-id", "abc");
    expect(getDataId(element)).toBeNull();
  });
});
