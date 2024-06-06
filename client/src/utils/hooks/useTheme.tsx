import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.Telegram) {
      const theme = window.Telegram.WebApp.colorScheme;
      changeTheme(theme);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    document.cookie = `theme=${newTheme};path=/;max-age=31536000`;
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(`theme-${newTheme}`);
    setTheme(newTheme);
  };

  const onChangeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    changeTheme(newTheme);
  };
  useEffect(() => {
    const savedTheme = document.cookie.match(/theme=([^;]*)/)?.[1] as
      | Theme
      | undefined;
    if (savedTheme && ["light", "dark"].includes(savedTheme))
      changeTheme(savedTheme);
    else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      changeTheme("dark");
    } else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
      changeTheme("light");
    } else if (process.env.NEXT_PUBLIC_THEME) {
      changeTheme(process.env.NEXT_PUBLIC_THEME as Theme);
    }
  }, []);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (e.matches) {
          changeTheme("dark");
        } else {
          changeTheme("light");
        }
      });
  }, []);
};
