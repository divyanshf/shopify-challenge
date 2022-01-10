import "./App.css";
import { useContext } from "react";
import {
  ThemeModeContext,
  ThemeModeProvider,
} from "./contexts/ThemeModeContext";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import Background from "./components/Background";
import MainComponent from "./components/MainComponent";
import { grey } from "@mui/material/colors";
import { UserOptionsProvider } from "./contexts/UserOptions";
import AOS from "aos";
import { FilterOptionsProvider } from "./contexts/FilterOptions";

// AOS
AOS.init();

// Themed App
function ThemedComponent() {
  const [mode] = useContext(ThemeModeContext);

  // light theme
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        paper: grey[200],
      },
    },
  });

  // dark theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: grey[900],
      },
    },
  });

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <GlobalStyles
        styles={{
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === "light" ? grey[100] : grey[900],
            width: 10,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? grey[400] : grey[700],
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[800],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: mode === "light" ? grey[500] : grey[800],
            },
        }}
      />
      <Background />
      <MainComponent />
    </ThemeProvider>
  );
}

// App
function App() {
  return (
    <ThemeModeProvider>
      <UserOptionsProvider>
        <FilterOptionsProvider>
          <ThemedComponent />
        </FilterOptionsProvider>
      </UserOptionsProvider>
    </ThemeModeProvider>
  );
}

export default App;
