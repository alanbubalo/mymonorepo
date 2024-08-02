import { test, expect, describe, afterEach } from "vitest";
import { storage } from "../storage";

describe("Storage", () => {
  afterEach(() => {
    storage.removeAll();
  });

  test("item of value undefined should be undefined", () => {
    storage.setItem("item", undefined);

    const item = storage.getItem("item");

    expect(item).toBe(undefined);
  });

  test("item of value null should be null", () => {
    storage.setItem("item", null);

    const item = storage.getItem("item");

    expect(item).toBe(null);
  });

  test("getting non existing item should return undefined", () => {
    const item = storage.getItem("item");

    expect(item).toBe(undefined);
  });

  test("removing non existing item should be ignored", () => {
    storage.setItem("item", "good_string");

    storage.removeItem("item");

    storage.removeItem("item");
  });
});
