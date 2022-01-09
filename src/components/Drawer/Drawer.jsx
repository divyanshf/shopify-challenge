import { Close, DarkMode, LightMode, Settings } from "@mui/icons-material";
import {
  SwipeableDrawer as Drawer,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Switch,
  Typography,
  Divider,
} from "@mui/material";
import { orange, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { UserOptions } from "../../contexts/UserOptions";

const DrawerComponent = ({ open, handleClose }) => {
  const [mode, toggleMode] = useContext(ThemeModeContext);
  const [options, changeSettings] = useContext(UserOptions);

  const toggleScrollData = () =>
    changeSettings("scrollData", !options.scrollData);

  return (
    <Drawer open={open} onClose={handleClose} anchor="right" onOpen={() => {}}>
      <Box sx={{ width: 250 }}>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center">
              <Settings sx={{ mr: 1 }} />
              <Typography variant="h6">Settings</Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography sx={{ fontSize: 16, width: "100%" }}>
              Dark Theme
            </Typography>
            <Switch
              checked={mode === "dark"}
              onChange={toggleMode}
              color="warning"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Typography sx={{ fontSize: 16, width: "100%" }}>
              Load Data on Scroll
            </Typography>
            <Switch
              checked={options.scrollData}
              onChange={toggleScrollData}
              color="warning"
            />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
