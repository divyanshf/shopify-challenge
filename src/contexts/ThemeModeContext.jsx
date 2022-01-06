import { Brightness4, DarkMode, LightMode } from "@mui/icons-material";
import { grey, orange, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { createContext, useState } from "react";

export const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children, themeMode }) => {
  const [mode, setMode] = useState(themeMode);
  const [loading, setLoading] = useState(false);
  const toggleMode = () => {
    setLoading(true);
    setTimeout(() => {
      setMode((prev) => {
        localStorage.setItem("mode", themeMode === "light" ? "dark" : "light");
        return prev === "light" ? "dark" : "light";
      });
      setLoading(false);
    }, 500);
  };
  return (
    <ThemeModeContext.Provider value={[mode, toggleMode]}>
      <Box
        position="fixed"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          top: 0,
          left: 0,
          backgroundColor: mode === "light" ? grey[50] : grey[900],
          zIndex: 10000,
          opacity: loading ? 1 : 0,
          transition: "0.8s ease",
          pointerEvents: "none",
        }}
      >
        <Brightness4
          sx={{
            fontSize: 100,
            color: mode === "light" ? yellow[800] : orange[700],
            transition: "0.3s ease",
          }}
        />
      </Box>
      {children}
    </ThemeModeContext.Provider>
  );
};
