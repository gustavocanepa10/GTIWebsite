import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ChannelOrbit } from "@/components/site/ChannelOrbit";

const animation = vi.hoisted(() => ({ frame: null, set: vi.fn() }));
vi.mock("motion/react", () => ({
  motion: { div: ({ children, style, ...props }) => <div {...props}>{children}</div> },
  useInView: () => true,
  useMotionValue: () => ({ get: () => 0, set: animation.set }),
  useTransform: () => 0,
  useAnimationFrame: (callback) => {
    animation.frame = callback;
  },
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  animation.set.mockClear();
});

it("automatically rotates continuously without playback buttons", () => {
  vi.spyOn(window, "matchMedia").mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  render(<ChannelOrbit />);
  animation.frame(100, 16);
  expect(animation.set).toHaveBeenCalledWith(0.048);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  animation.frame(116, 16);
  expect(animation.set).toHaveBeenCalledWith(0.048);
  animation.frame(132, 16);
  expect(animation.set).toHaveBeenCalledTimes(3);
});
