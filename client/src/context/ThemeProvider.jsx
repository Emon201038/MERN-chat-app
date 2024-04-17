// ThemeProvider.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("appTheme");
  if (!storedTheme) {
    localStorage.setItem("appTheme", JSON.stringify("dark"));
  }
  const initialTheme = JSON.parse(storedTheme);

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("appTheme", JSON.stringify(newTheme));
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
    typography: {
      allVariants: {
        color: theme === "dark" ? "white" : "black",
      },
    },
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
