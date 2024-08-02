import { test, expect } from "vitest";
import { storage } from "../storage";

test("item of value undefined should be undefined", () => {
  storage.removeAll();
  storage.setItem("item", undefined);

  const item = storage.getItem("item");

  expect(item).toBe(undefined);
});

test("item of value null should be null", () => {
  storage.removeAll();
  storage.setItem("item", null);

  const item = storage.getItem("item");

  expect(item).toBe(null);
});

test("getting non existing item should return undefined", () => {
  storage.removeAll();
  const item = storage.getItem("item");

  expect(item).toBe(undefined);
});

test("removing non existing item should be ignored", () => {
  storage.removeAll();
  storage.setItem("item", "good_string");

  localStorage.removeItem("item");

  localStorage.removeItem("item");
});
