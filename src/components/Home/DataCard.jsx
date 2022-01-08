import { Event } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CardDialog from "./CardDialog";

const DataCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const link =
    data && data.links ? data.links.find((o) => o.render === "image") : null;

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const truncate = (str) => {
    let mx = 100;
    return str.length > mx ? str.slice(0, mx) + "..." : str;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatDateWithDay = (date) => new Date(date).toDateString();

  if (!link) return null;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ p: 2 }}>
      <Card onClick={handleOpenDialog}>
        <CardActionArea>
          <CardMedia image={link.href} sx={{ pt: "56.25%" }} />
          <CardContent>
            <Typography variant="h6">{data.data[0].title}</Typography>
            <Typography color="text.disabled">
              {truncate(data.data[0].description)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="flex-start">
              <Event sx={{ mr: 1 }} color="primary" />
              <Typography color="text.disabled">
                {formatDate(data.data[0].date_created)}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <CardDialog
        open={open}
        handleClose={handleCloseDialog}
        data={data.data[0]}
        image={link.href}
        functions={{ formatDate, formatDateWithDay }}
      />
    </Grid>
  );
};

export default DataCard;
