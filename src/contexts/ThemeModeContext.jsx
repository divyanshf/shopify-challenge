import { Brightness4, DarkMode, LightMode } from "@mui/icons-material";
import { Backdrop } from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const icon = useRef(null);
  const toggleMode = () => {
    setTempMode((prev) => {
      localStorage.setItem("mode", themeMode === "light" ? "dark" : "light");
      return prev === "light" ? "dark" : "light";
    });
    setOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMode(tempMode);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [tempMode]);

  useLayoutEffect(() => {
    if (icon && icon.current) {
      if (open) {
        icon.current.classList.add("theme-load");
      } else {
        icon.current.classList.remove("theme-load");
      }
    }
  }, [open]);

  return (
    <ThemeModeContext.Provider value={[mode, toggleMode]}>
      {children}
      <Backdrop
        open={open}
        sx={{ zIndex: 10000, backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        <Box
          ref={icon}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {mode === "light" ? (
            <LightMode
              sx={{
                fontSize: 100,
                color: orange[700],
                transition: "0.3s ease",
              }}
            />
          ) : (
            <DarkMode
              sx={{
                fontSize: 100,
                color: yellow[800],
                transition: "0.3s ease",
              }}
            />
          )}
        </Box>
      </Backdrop>
    </ThemeModeContext.Provider>
  );
};
