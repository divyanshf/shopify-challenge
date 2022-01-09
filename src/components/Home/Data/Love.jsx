import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const getLove = (nasa_id) => {
  return localStorage.getItem(nasa_id);
};

const LoveComponent = ({ data }) => {
  const [love, setLove] = useState(false);
  const toggleLove = () => {
    const cur = getLove(data.nasa_id);
    localStorage.setItem(data.nasa_id, !(cur === "true"));
    setLove(!(cur === "true"));
  };
  useEffect(() => {
    setLove(getLove(data.nasa_id) === "true");
  }, [data]);
  return (
    <Box>
      <Tooltip title={love ? "Unlike" : "Love"}>
        <IconButton onClick={toggleLove}>
          {love ? <Favorite color="error" /> : <FavoriteBorder color="error" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LoveComponent;
