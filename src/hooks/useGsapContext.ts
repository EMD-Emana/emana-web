'use client';

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The single entry point for GSAP in this project.
 *
 * Motion contract enforced here, so no component has to remember it:
 *  1. Every animation lives inside gsap.matchMedia('(prefers-reduced-motion: no-preference)'),
 *     so a user who asks for reduced motion simply never gets the tween.
 *  2. Everything is scoped with gsap.context(scope) and reverted on unmount, which
 *     also kills the ScrollTriggers created inside it — no leaks across route changes.
 *  3. The "from" state is applied at runtime, never in CSS, so content is always
 *     readable without JavaScript.
 *  4. Callers should only animate `transform` and `opacity` to stay on the compositor.
 */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface GsapSetupArgs {
  /** The element the returned ref is attached to. Already the context scope. */
  readonly root: HTMLElement;
  readonly gsap: typeof gsap;
  readonly ScrollTrigger: typeof ScrollTrigger;
}

export type GsapSetup = (args: GsapSetupArgs) => void;

export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: GsapSetup,
  deps: DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const setupRef = useRef<GsapSetup>(setup);

  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
  }, [setup]);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;

    if (root === null) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        setupRef.current({ root, gsap, ScrollTrigger });
      }, root);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
    // The caller owns the dependency list; `setup` is read through a ref so a
    // fresh inline closure never re-runs the animation on every render.
    // (No eslint-disable needed: react-hooks/exhaustive-deps only inspects an
    // inline array literal, and this is a forwarded parameter.)
  }, deps);

  return ref;
}
