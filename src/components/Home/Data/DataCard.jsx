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
  useTheme,
  alpha,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const type = data.data[0].media_type;
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const truncate = (str, mx = 100) => {
    return str.length > mx ? str.slice(0, mx) + "..." : str;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatDateWithDay = (date) => new Date(date).toDateString();

  const link =
    data && data.links ? data.links.find((o) => o.render === "image") : null;

  const fetchAudioUrl = async () => {
    const res = await axios.get(data.href);
    return res.data;
  };

  useEffect(() => {
    if (type === "audio")
      fetchAudioUrl()
        .then((res) => {
          setAudioUrl(res[0]);
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

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
            sx={(theme) => ({
              background: theme.palette.background.default,
              p: 1,
            })}
          >
            <Typography variant="h6" sx={{ my: 1 }}>
              {truncate(data.data[0].title, 50)}
            </Typography>
            {type === "audio" ? (
              <audio src={audioUrl} controls style={{ width: "100%" }} />
            ) : (
              <CardMedia
                image={link.href}
                sx={{ pt: "55.25%", borderRadius: 2 }}
              />
            )}
          </CardActionArea>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
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
          link={type === "image" ? link.href : audioUrl}
          functions={{ formatDate, formatDateWithDay }}
          type={type}
        />
      </StyledBox>
    </Grid>
  );
};

export default DataCard;
