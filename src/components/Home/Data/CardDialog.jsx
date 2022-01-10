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
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoveComponent from "./Love";
import ShareComponent from "./Share";

const CardDialog = ({ data, link, type, open, handleClose, functions }) => {
  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        {type === "image" ? (
          <CardMedia
            image={link}
            sx={{ pt: "56.25%", mb: 1, borderRadius: 2 }}
          />
        ) : (
          <audio controls src={link} style={{ width: "100%" }} />
        )}
        {data.location && (
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <LocationOnRounded color="warning" />
              <Typography variant="caption">{data.location}</Typography>
            </Grid>
          </Grid>
        )}
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex">
            <LoveComponent data={data} />
            <ShareComponent data={data} />
          </Box>
          <Box>
            <Tooltip title="Open link">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <OpenInNew sx={{ color: "primary.main" }} />
              </a>
            </Tooltip>
          </Box>
        </CardActions>
        <Divider sx={{ mb: 1 }} />
        <Typography color="text.disabled">{data.description}</Typography>
        {/* <Box display="flex" alignItems="flex-start">
          <Event sx={{ mr: 1 }} color="primary" />
          <Typography color="text.disabled">
            {functions.formatDate(data.date_created)}
            {` (${functions.formatDateWithDay(data.date_created)})`}
          </Typography>
        </Box> */}
        {data.date_created && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="caption" color="text.disabled">
              {functions.formatDate(data.date_created)}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
