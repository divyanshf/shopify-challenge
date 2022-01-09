import { Event, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CardDialog from "./CardDialog";

const getLove = (nasa_id) => {
  return localStorage.getItem(nasa_id);
};

const DataCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [love, setLove] = useState(getLove(data.data[0].nasa_id));
  const link =
    data && data.links ? data.links.find((o) => o.render === "image") : null;

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const toggleLove = () => {
    localStorage.setItem(data.data[0].nasa_id, !love);
    setLove((prev) => !prev);
  };

  const truncate = (str, mx = 100) => {
    return str.length > mx ? str.slice(0, mx) + "..." : str;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatDateWithDay = (date) => new Date(date).toDateString();

  if (!link) return null;
  return (
    <Grid
      item
      xs={12}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          transition: "0.3s ease",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <Card
          elevation={0}
          sx={(theme) => ({
            width: "100%",
            border: 1,
            borderColor: theme.palette.divider,
          })}
        >
          <CardActionArea
            onClick={handleOpenDialog}
            sx={(theme) => ({ background: theme.palette.background.default })}
          >
            <CardContent>
              <Typography variant="h6">
                {truncate(data.data[0].title, 50)}
              </Typography>
            </CardContent>
            <CardMedia image={link.href} sx={{ pt: "55.25%" }} />
            {/* <CardContent>
          </CardContent> */}
          </CardActionArea>
          <CardActions>
            <Tooltip title={love ? "Unlike" : "Love"}>
              <IconButton onClick={toggleLove}>
                {love ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder color="error" />
                )}
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
        <Typography variant="caption" color="text.disabled">
          {formatDate(data.data[0].date_created)}
        </Typography>
        <CardDialog
          open={open}
          handleClose={handleCloseDialog}
          data={{ ...data.data[0], love }}
          image={link.href}
          functions={{ formatDate, formatDateWithDay, getLove, toggleLove }}
        />
      </Box>
    </Grid>
  );
};

export default DataCard;
