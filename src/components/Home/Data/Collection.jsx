import { KeyboardArrowUp } from "@mui/icons-material";
import { Container, Grid, Grow, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import DataCard from "./DataCard";

const Collection = ({ images }) => {
  // Go to top
  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <Grid container>
        {images.map((i, k) => (
          <DataCard data={i} key={k} />
        ))}
      </Grid>
      <Box position="fixed" sx={{ right: "1rem", bottom: "1rem" }}>
        <Grow in={true} timeout={300}>
          <Tooltip title="Go to top">
            <IconButton onClick={goTop} color="warning">
              <KeyboardArrowUp color="warning" />
            </IconButton>
          </Tooltip>
        </Grow>
      </Box>
    </Container>
  );
};

export default Collection;
