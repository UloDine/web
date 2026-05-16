"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

let isConfigured = false;

function configureProgressBar() {
  if (isConfigured) {
    return;
  }

  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 120,
    minimum: 0.08,
    speed: 300,
    easing: "ease",
    parent: "body",
  });

  isConfigured = true;
}

export default function ProgressBar() {
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    configureProgressBar();

    mountedRef.current = true;

    const start = () => {
      if (!mountedRef.current) {
        return;
      }

      if (startedRef.current) {
        return;
      }

      startedRef.current = true;
      NProgress.start();
    };

    const done = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (!startedRef.current) {
        return;
      }

      startedRef.current = false;
      NProgress.done();
    };

    const scheduleStart = () => {
      if (!mountedRef.current) {
        return;
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        start();
      }, 80);
    };

    const handleRouteStart = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        return;
      }

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      const nextUrl = `${url.pathname}${url.search}`;
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (nextUrl === currentUrl) {
        return;
      }

      scheduleStart();
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      scheduleStart();
      return originalPushState.apply(
        this,
        args as Parameters<History["pushState"]>,
      );
    };

    window.history.replaceState = function (...args) {
      return originalReplaceState.apply(
        this,
        args as Parameters<History["replaceState"]>,
      );
    };

    window.addEventListener("click", handleRouteStart, true);
    window.addEventListener("popstate", scheduleStart);

    return () => {
      mountedRef.current = false;

      done();

      window.removeEventListener("click", handleRouteStart, true);
      window.removeEventListener("popstate", scheduleStart);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      NProgress.done(true);
      startedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!pathname || !mountedRef.current) {
      return;
    }

    if (startedRef.current || timerRef.current) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      startedRef.current = false;
      NProgress.done();
    }
  }, [pathname]);

  return null;
}
