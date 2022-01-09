import { Event, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import CardDialog from "./CardDialog";
import LoveComponent from "./Love";
import ShareComponent from "./Share";

const StyledBox = styled(Box)({
  maxWidth: 500,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  transition: "0.3s ease",
  "&:hover": {},
});

const DataCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const link =
    data && data.links ? data.links.find((o) => o.render === "image") : null;

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const truncate = (str, mx = 100) => {
    return str.length > mx ? str.slice(0, mx) + "..." : str;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatDateWithDay = (date) => new Date(date).toDateString();

  if (!link) return null;
  return (
    <Grid
      data-aos="fade-up"
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
      <StyledBox>
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
            <LoveComponent data={data.data[0]} />
            <ShareComponent data={data.data[0]} />
          </CardActions>
        </Card>
        <Typography variant="caption" color="text.disabled">
          {formatDate(data.data[0].date_created)}
        </Typography>
        <CardDialog
          open={open}
          handleClose={handleCloseDialog}
          data={data.data[0]}
          image={link.href}
          functions={{ formatDate, formatDateWithDay }}
        />
      </StyledBox>
    </Grid>
  );
};

export default DataCard;
