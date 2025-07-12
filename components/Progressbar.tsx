// components/ProgressBar.tsx
"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "../app/globals.css"; // Import the CSS you created
import "nprogress/nprogress.css"; // Import NProgress styles

export default function ProgressBar() {
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    // Start NProgress on component mount (e.g., when a page starts loading)
    NProgress.start();

    // Stop NProgress when the component unmounts (e.g., when a page finishes loading)
    return () => {
      NProgress.done();
    };
  }, []); // Empty dependency array ensures this runs once on mount and unmount

  return null; // This component doesn't render any visible elements itself
}
