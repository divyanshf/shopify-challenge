import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CardDialog from "./CardDialog";

const DataCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const link = data.links.find((o) => o.render === "image");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const truncate = (str) => {
    let mx = 200;
    return str.length > mx ? str.slice(0, mx) + "..." : str;
  };

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
          </CardContent>
        </CardActionArea>
      </Card>
      <CardDialog
        open={open}
        handleClose={handleCloseDialog}
        data={data.data[0]}
        image={link.href}
      />
    </Grid>
  );
};

export default DataCard;
