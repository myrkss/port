"use client";

import { useEffect } from "react";

/*
 * one observer + one scroll listener for the whole page:
 *   [data-reveal]   gets [data-in] the first time it enters the viewport (styles in globals.css)
 *   [data-parallax] drifts vertically inside its .media frame
 *   [data-drift]    slides horizontally by up to the given number of pixels
 * parallax and drift are desktop-only and off under prefers-reduced-motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      reveals.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const movers = document.querySelectorAll<HTMLElement>("[data-parallax], [data-drift]");
    if (!movers.length || !window.matchMedia("(min-width: 768px) and (hover: hover)").matches) {
      return () => revealObserver.disconnect();
    }

    const onScreen = new Set<HTMLElement>();
    const moverObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target.querySelector<HTMLElement>("[data-parallax], [data-drift]");
          if (!el) continue;
          if (entry.isIntersecting) onScreen.add(el);
          else onScreen.delete(el);
        }
        update();
      },
      { rootMargin: "20% 0px" },
    );
    // the parent is observed because its box does not move with the transform
    movers.forEach((el) => el.parentElement && moverObserver.observe(el.parentElement));

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      for (const el of onScreen) {
        const rect = el.parentElement!.getBoundingClientRect();
        // -1 when the frame has just left the top of the viewport, 1 when it is about to enter from below
        const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
        if (el.dataset.drift) {
          el.style.transform = `translate3d(${(progress * Number(el.dataset.drift)).toFixed(1)}px, 0, 0)`;
        } else {
          el.style.transform = `translate3d(0, ${(-progress * rect.height * 0.07).toFixed(1)}px, 0)`;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      moverObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
