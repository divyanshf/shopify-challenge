import { Close, DarkMode, LightMode, Search } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { orange, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";

const Navbar = ({ query, handleSearchChange }) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [mode, toggleMode] = useContext(ThemeModeContext);
  const [isSearch, setIsSearch] = useState(false);

  const toggleSearchState = () => {
    if (isSearch) handleSearchChange("");
    setIsSearch((prev) => !prev);
  };
  const handleQueryChange = (e) => handleSearchChange(e.target.value);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ padding: 1, backgroundColor: "transparent" }}
    >
      <Toolbar
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          color: theme.palette.text.primary,
          padding: 1,
          boxShadow: 4,
        })}
      >
        {small && isSearch ? null : (
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="h6">Spacestagram</Typography>
          </Link>
        )}
        {small && isSearch ? null : <Box sx={{ flexGrow: 1, mx: 2 }} />}
        {!isSearch ? (
          <Tooltip title="Search" sx={{ mr: 1 }}>
            <IconButton onClick={toggleSearchState}>
              <Search />
            </IconButton>
          </Tooltip>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={(theme) => ({
              mr: 1,
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: 2,
              px: 2,
              py: 1,
            })}
          >
            <InputBase
              value={query}
              onChange={handleQueryChange}
              variant="outlined"
              placeholder="Search . . ."
              sx={{
                width: "100%",
                transition: "0.3s ease",
              }}
            />
            <Close
              sx={{
                "&:hover": { cursor: "pointer" },
              }}
              onClick={toggleSearchState}
            />
          </Box>
        )}
        <Tooltip title={mode === "light" ? "Dark Theme" : "Light Theme"}>
          <IconButton onClick={toggleMode}>
            {mode === "light" ? (
              <DarkMode sx={{ color: yellow[800] }} />
            ) : (
              <LightMode sx={{ color: orange[500] }} />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
