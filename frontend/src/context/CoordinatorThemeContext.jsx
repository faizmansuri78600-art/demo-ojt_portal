import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CoordinatorThemeContext =
  createContext(null);

const LIGHT_THEME = {
  mode: "light",

  colors: {
    sidebar: "#123B6D",
    sidebarHover: "#174A84",
    sidebarActive: "#1D5AA0",
    sidebarText: "#EAF3FF",

    footer: "#123B6D",

    workspace: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",

    text: "#0F172A",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",

    border: "#E2E8F0",
    borderLight: "#EEF2F7",

    primary: "#2563EB",
    primaryHover: "#1D4ED8",
    primarySoft: "#EFF6FF",

    success: "#16A34A",
    successSoft: "#F0FDF4",

    warning: "#D97706",
    warningSoft: "#FFFBEB",

    danger: "#DC2626",
    dangerSoft: "#FEF2F2",

    info: "#0284C7",
    infoSoft: "#F0F9FF",
  },
};

const DARK_THEME = {
  mode: "dark",

  colors: {
    sidebar: "#0B2545",
    sidebarHover: "#123B6D",
    sidebarActive: "#1D5AA0",
    sidebarText: "#E2E8F0",

    footer: "#0B2545",

    workspace: "#0F172A",
    surface: "#1E293B",
    surfaceMuted: "#172033",

    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",

    border: "#334155",
    borderLight: "#263449",

    primary: "#3B82F6",
    primaryHover: "#60A5FA",
    primarySoft: "#172554",

    success: "#22C55E",
    successSoft: "#052E16",

    warning: "#F59E0B",
    warningSoft: "#451A03",

    danger: "#EF4444",
    dangerSoft: "#450A0A",

    info: "#38BDF8",
    infoSoft: "#082F49",
  },
};

export function CoordinatorThemeProvider({
  children,
}) {
  const [darkMode, setDarkMode] =
    useState(() => {
      const savedTheme =
        localStorage.getItem(
          "coordinator-theme"
        );

      return savedTheme === "dark";
    });

  const theme = useMemo(() => {
    return darkMode
      ? DARK_THEME
      : LIGHT_THEME;
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "coordinator-theme",
      darkMode ? "dark" : "light"
    );

    document.documentElement.setAttribute(
      "data-coordinator-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((value) => !value);
  };

  const value = {
    darkMode,
    setDarkMode,
    toggleTheme,
    theme,
    colors: theme.colors,
  };

  return (
    <CoordinatorThemeContext.Provider
      value={value}
    >
      {children}
    </CoordinatorThemeContext.Provider>
  );
}

export function useCoordinatorTheme() {
  const context = useContext(
    CoordinatorThemeContext
  );

  if (!context) {
    throw new Error(
      "useCoordinatorTheme must be used inside CoordinatorThemeProvider"
    );
  }

  return context;
}