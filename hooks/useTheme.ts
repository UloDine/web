import { useEffect, useState } from "react";

export const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>("light");
  // const [theme, setTheme] = useState<Theme>(
  //   window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  // );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return theme;
};
