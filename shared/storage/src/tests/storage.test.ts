import { test, expect, describe, vi, afterEach } from "vitest";
import { storage } from "../storage";
import { localStorageMock } from "./mock/localStorageMock";

vi.stubGlobal("localStorage", localStorageMock);

describe("Storage", () => {
  afterEach(() => {
    storage.removeAll();
  });

  test("item of value 5 should be of type number", () => {
    storage.setItem("item", 5);

    const item = storage.getItem<number>("item");

    expect(typeof item).toBe("number");
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
});
