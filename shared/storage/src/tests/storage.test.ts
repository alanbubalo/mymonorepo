import { afterEach, describe, expect, it } from "vitest";
import { storage } from "../storage";
import { localStorageMock } from "./mock/localStorageMock";

globalThis.localStorage = localStorageMock;

afterEach(() => {
  storage.removeAll();
});

describe("getItem", () => {
  it("should return a number when retrieving a stored number value", () => {
    storage.setItem("item", 5);

    const item = storage.getItem<number>("item");

    expect(typeof item).toBe("number");
  });

  it("should return undefined when retrieving undefined", () => {
    storage.setItem("item", undefined);

    const item = storage.getItem("item");

    expect(item).toBe(undefined);
  });

  it("should return null when retrieving null", () => {
    storage.setItem("item", null);

    const item = storage.getItem("item");

    expect(item).toBe(null);
  });

  it("should return undefined if the item was not set", () => {
    const item = storage.getItem("item");

    expect(item).toBe(undefined);
  });
});
