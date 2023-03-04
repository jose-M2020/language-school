import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = () => ({
  primary: '#112E40',
  secondary: '#41D992',
  blueAccent: '#4BA695',
  white: '#F1F8FC'
});

// mui theme settings
export const themeSettings = () => {
  const colors = tokens();
  return {
    palette: {
      // palette values for dark mode
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      // neutral: {
      //   dark: colors.grey[700],
      //   main: colors.grey[500],
      //   light: colors.grey[100],
      // },
      background: {
        default: colors.primary,
      }
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 13,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return theme;
};