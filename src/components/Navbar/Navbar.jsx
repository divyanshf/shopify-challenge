import { Close, DarkMode, LightMode, Search } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { orange, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { searchAPI } from "../../controllers/api";

const Navbar = ({ handleListUpdate, setLoading, setError, loading }) => {
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState("");
  const theme = useTheme();
  const [mode, toggleMode] = useContext(ThemeModeContext);
  const [isSearch, setIsSearch] = useState(false);

  const toggleSearchState = () => {
    if (isSearch) setDebounce("");
    setIsSearch((prev) => !prev);
  };

  // Handle query change
  const handleQueryChange = (e) => {
    setDebounce(e.target.value);
  };

  // Handle Debounce
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setSearch(debounce);
    }, 600);
    return () => clearTimeout(timer);
  }, [debounce]);

  // Handle API call
  useEffect(() => {
    handleListUpdate({});
    searchAPI(search)
      .then((res) => {
        handleListUpdate(res.data);
        setError("");
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, [search]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ padding: 1, backgroundColor: "transparent" }}
    >
      <Toolbar
        sx={(theme) => ({
          position: "relative",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          color: theme.palette.text.primary,
          padding: 1,
          boxShadow: 4,
        })}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/logo192.png"
                alt="Spacestagram"
                style={{ width: "50px" }}
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Spacestagram
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            xs={true}
          >
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
                  width: "100%",
                  minWidth: "5ch",
                  maxWidth: "20ch",
                  mr: 1,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                })}
              >
                <InputBase
                  value={debounce}
                  onChange={handleQueryChange}
                  variant="outlined"
                  placeholder="Search . . ."
                  sx={{
                    width: "100%",
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
          </Grid>
        </Grid>
        {loading && (
          <LinearProgress
            color="success"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              overflow: "hidden",
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
