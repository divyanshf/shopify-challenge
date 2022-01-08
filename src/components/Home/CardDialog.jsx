import {
  Event,
  FavoriteBorder,
  Favorite,
  LocationOnRounded,
  OpenInNew,
} from "@mui/icons-material";
import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Box,
  CardActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardDialog = ({ data, image, open, handleClose, functions }) => {
  const getLove = () => {
    return localStorage.getItem(data.nasa_id);
  };

  const [love, setLove] = useState(getLove());
  const [downloaded, setDownloaded] = useState(false);

  const toggleLove = () => {
    localStorage.setItem(data.nasa_id, !love);
    setLove((prev) => !prev);
    console.log(data, image);
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        <CardMedia
          image={image}
          sx={{ pt: "56.25%", mb: 1, borderRadius: 2 }}
        />
        {data.location && (
          <Box display="flex" alignItems="center">
            <LocationOnRounded color="warning" />
            <Typography variant="caption">{data.location}</Typography>
          </Box>
        )}
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
          <Tooltip title="Open Image">
            <a href={image} target="_blank" rel="noopener noreferrer">
              <OpenInNew sx={{ color: "primary.main" }} />
            </a>
          </Tooltip>
        </CardActions>
        <Divider sx={{ mb: 1 }} />
        <Typography color="text.disabled">{data.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" alignItems="flex-start">
          <Event sx={{ mr: 1 }} color="primary" />
          <Typography color="text.disabled">
            {functions.formatDate(data.date_created)}
            {` (${functions.formatDateWithDay(data.date_created)})`}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
