import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useMediaQuery from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners;
  let mockMedia;

  beforeEach(() => {
    listeners = [];
    mockMedia = {
      matches: false,
      addEventListener: vi.fn((event, listener) => {
        listeners.push(listener);
      }),
      removeEventListener: vi.fn((event, listener) => {
        listeners = listeners.filter((l) => l !== listener);
      })
    };
    window.matchMedia = vi.fn().mockReturnValue(mockMedia);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns false initially when media does not match", () => {
    mockMedia.matches = false;
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(false);
  });

  test("returns true initially when media matches", () => {
    mockMedia.matches = true;
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(true);
  });

  test("updates when the media query change event fires", () => {
    mockMedia.matches = false;
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(false);

    act(() => {
      mockMedia.matches = true;
      listeners.forEach((l) => l());
    });

    expect(result.current).toBe(true);
  });

  test("removes event listener on unmount", () => {
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    unmount();
    expect(mockMedia.removeEventListener).toHaveBeenCalled();
  });

  test("calls matchMedia with the supplied query string", () => {
    const query = "(max-width: 768px)";
    renderHook(() => useMediaQuery(query));
    expect(window.matchMedia).toHaveBeenCalledWith(query);
  });
});
