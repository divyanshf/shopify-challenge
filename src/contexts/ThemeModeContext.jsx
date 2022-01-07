import { Brightness4, DarkMode, LightMode } from "@mui/icons-material";
import { grey, orange, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children, themeMode }) => {
  const [mode, setMode] = useState(themeMode);
  const [tempMode, setTempMode] = useState(mode);
  const backdrop = useRef(null);
  const toggleMode = () => {
    setTempMode((prev) => {
      localStorage.setItem("mode", themeMode === "light" ? "dark" : "light");
      return prev === "light" ? "dark" : "light";
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMode(tempMode);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [tempMode]);

  useLayoutEffect(() => {
    if (backdrop && backdrop.current) {
      backdrop.current.classList.add("theme-load");
      setTimeout(() => {
        backdrop.current.classList.remove("theme-load");
      }, 1000);
    }
  }, [tempMode]);

  return (
    <ThemeModeContext.Provider value={[mode, toggleMode]}>
      <Box
        ref={backdrop}
        position="fixed"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          top: 0,
          left: "-100%",
          zIndex: 10000,
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
