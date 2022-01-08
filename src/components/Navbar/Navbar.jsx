import {
  Close,
  DarkMode,
  LightMode,
  Search,
  Settings,
} from "@mui/icons-material";
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
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchAPI } from "../../controllers/api";
import DrawerComponent from "../Drawer/Drawer";

const Navbar = ({ handleListUpdate, setLoading, setError, children }) => {
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState("");
  const theme = useTheme();
  const [drawer, setDrawer] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [top, setTop] = useState(true);

  const handleDrawerOpen = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

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

  // Use effect
  useEffect(() => {
    // if (mainRef && mainRef.current) {
    // }
    window.addEventListener("scroll", handleScoll);
    return () => window.removeEventListener("scroll", handleScoll);
  }, []);

  // Handle scroll change
  const handleScoll = (e) => {
    if (window.pageYOffset === 0) setTop(true);
    else setTop(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        padding: top ? 0 : 1,
        backgroundColor: "transparent",
        transition: "0.5s ease",
      }}
    >
      <Toolbar
        sx={(theme) => ({
          position: "relative",
          backgroundColor: theme.palette.background.paper,
          borderRadius: top ? 0 : 2,
          color: theme.palette.text.primary,
          padding: 1,
          boxShadow: 4,
          transition: "0.5s ease",
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
                src={process.env.PUBLIC_URL + "/logo192.png"}
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
            <Tooltip title="Settings">
              <IconButton onClick={handleDrawerOpen}>
                <Settings />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <DrawerComponent open={drawer} handleClose={handleDrawerClose} />
      {children}
    </AppBar>
  );
};

export default Navbar;
