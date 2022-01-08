import { Event } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Box,
} from "@mui/material";

const CardDialog = ({ data, image, open, handleClose, functions }) => {
  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        <CardMedia
          image={image}
          sx={{ pt: "56.25%", mb: 2, borderRadius: 2 }}
        />
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
