import { Close, Search, Settings } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { searchAPI } from "../../controllers/api";
import useQuery from "../../hooks/QueryParams";
import DrawerComponent from "../Drawer/Drawer";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleListUpdate, setLoading, setError, children }) => {
  const theme = useTheme();
  const query = useQuery();
  const navigate = useNavigate();
  const big = useMediaQuery(`(min-width:${theme.breakpoints.values.sm}px)`);
  const [search, setSearch] = useState(query.get("search") || "");
  const [debounce, setDebounce] = useState(query.get("search") || "");
  const [drawer, setDrawer] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [top, setTop] = useState(true);

  const handleDrawerOpen = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

  const toggleSearchState = () => {
    // if (isSearch) setDebounce("");
    setIsSearch((prev) => !prev);
  };

  // Handle query change
  const handleQueryChange = (e) => {
    setDebounce(e.target.value);
  };

  const handleNavBrand = () => {
    setDebounce("");
  };

  const handleSearch = () => {
    searchAPI(search)
      .then((res) => {
        handleListUpdate(res.data);
        setError("");
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  // Handle Debounce
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setSearch(debounce);
      navigate("/?search=" + debounce);
    }, 600);
    return () => clearTimeout(timer);
  }, [debounce]);

  // Handle API call
  useEffect(() => {
    handleListUpdate({});
    handleSearch();
  }, [search]);

  // Use effect
  useEffect(() => {
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
          <Grid item xs={big ? "auto" : isSearch ? "auto" : true}>
            {isSearch && !big ? null : (
              <Box
                onClick={handleNavBrand}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/logo192.png"}
                  alt="Spacestagram"
                  style={{ width: "50px" }}
                />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Spinterest
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            xs={!big && isSearch ? 12 : "auto"}
          >
            {!isSearch && !big ? (
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
                sx={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  mr: 1,
                }}
              >
                <InputBase
                  value={debounce}
                  onChange={handleQueryChange}
                  variant="outlined"
                  placeholder="Search . . ."
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      width: big ? "25ch" : "100%",
                      px: 2,
                      py: 1,
                      transition: "0.3s ease",
                      "&:focus": {
                        width: big ? "30ch" : "100%",
                      },
                    },
                  }}
                />
                {!big && (
                  <Close
                    sx={{
                      p: 1,
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={toggleSearchState}
                  />
                )}
              </Box>
            )}
            {isSearch && !big ? null : (
              <Tooltip title="Settings">
                <IconButton onClick={handleDrawerOpen}>
                  <Settings />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
        {children}
      </Toolbar>
      <DrawerComponent open={drawer} handleClose={handleDrawerClose} />
    </AppBar>
  );
};

export default Navbar;
