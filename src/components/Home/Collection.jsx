import { Container, Grid } from "@mui/material";
import DataCard from "./DataCard";

const Collection = ({ images }) => {
  return (
    <Container>
      <Grid container>
        {images.map((i, k) => (
          <DataCard data={i} key={k} />
        ))}
      </Grid>
    </Container>
  );
};

export default Collection;
