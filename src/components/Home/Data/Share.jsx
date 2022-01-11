import { Share } from "@mui/icons-material";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const ShareComponent = ({ data }) => {
  const [open, setOpen] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(
      `https://divyanshfalodiya.github.io/shopify-challenge/?search=${data.nasa_id}`
    );
    handleOpen();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Tooltip title="Share">
        <IconButton onClick={copy}>
          <Share />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        color="success"
        message="Link copied to clipboard"
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Box>
  );
};

export default ShareComponent;
