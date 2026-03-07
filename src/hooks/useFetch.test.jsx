import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useRef } from "react";
import useFetch from "./useFetch";

function makeCacheRef(initial = {}) {
  return { current: initial };
}

describe("useFetch", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("starts in a fetching state", () => {
    global.fetch.mockResolvedValue({
      headers: { get: () => "application/json" },
      json: async () => ({})
    });
    const cache = makeCacheRef();
    const { result } = renderHook(() => useFetch("/data/test.json", cache));
    const [isFetching] = result.current;
    expect(isFetching).toBe(true);
  });

  test("fetches JSON and returns parsed data", async () => {
    const payload = { value: 42 };
    global.fetch.mockResolvedValue({
      headers: { get: () => "application/json" },
      json: async () => payload
    });
    const cache = makeCacheRef();
    const { result } = renderHook(() => useFetch("/data/test.json", cache));

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    const [, content] = result.current;
    expect(content).toEqual(payload);
  });

  test("fetches markdown and returns text", async () => {
    const mdText = "# Hello";
    global.fetch.mockResolvedValue({
      headers: { get: () => "text/markdown" },
      text: async () => mdText
    });
    const cache = makeCacheRef();
    const { result } = renderHook(() => useFetch("/pages/about.md", cache));

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    const [, content] = result.current;
    expect(content).toBe(mdText);
  });

  test("returns null content when content-type is unsupported", async () => {
    global.fetch.mockResolvedValue({
      headers: { get: () => "text/html" },
      text: async () => "<html/>"
    });
    const cache = makeCacheRef();
    const { result } = renderHook(() =>
      useFetch("/something.html", cache)
    );

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    const [, content] = result.current;
    expect(content).toBeNull();
  });

  test("returns null content on fetch error", async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));
    const cache = makeCacheRef();
    const { result } = renderHook(() => useFetch("/bad-url.json", cache));

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    const [, content] = result.current;
    expect(content).toBeNull();
  });

  test("does not fetch when url is falsy, sets isFetching false immediately", async () => {
    const cache = makeCacheRef();
    const { result } = renderHook(() => useFetch(null, cache));

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("returns cached data without fetching again", async () => {
    const cached = { cached: true };
    const cache = makeCacheRef({ "/data/cached.json": cached });
    const { result } = renderHook(() =>
      useFetch("/data/cached.json", cache)
    );

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    const [, content] = result.current;
    expect(content).toEqual(cached);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("stores fetched JSON in the cache", async () => {
    const payload = { stored: true };
    global.fetch.mockResolvedValue({
      headers: { get: () => "application/json" },
      json: async () => payload
    });
    const cache = makeCacheRef();
    const { result } = renderHook(() =>
      useFetch("/data/store.json", cache)
    );

    await waitFor(() => {
      const [isFetching] = result.current;
      expect(isFetching).toBe(false);
    });

    expect(cache.current["/data/store.json"]).toEqual(payload);
  });
});
