"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [data-cursor]";

// small dot that tracks the pointer 1:1 (no smoothing); fine pointers only
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      root.classList.add("has-cursor");
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      dot.toggleAttribute("data-visible", true);
      dot.toggleAttribute("data-active", event.target instanceof Element && event.target.closest(INTERACTIVE) !== null);
    };
    const onLeave = () => dot.toggleAttribute("data-visible", false);

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="cursor">
      <i />
    </div>
  );
}
