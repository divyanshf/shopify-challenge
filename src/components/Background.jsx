import { Box, useTheme } from "@mui/material";

const Background = (props) => {
  const theme = useTheme();
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      sx={{
        background: theme.palette.background.default,
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    ></Box>
  );
};

export default Background;
