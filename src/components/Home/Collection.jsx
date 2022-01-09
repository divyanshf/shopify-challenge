import { Container, Grid } from "@mui/material";
import DataCard from "./DataCard";

const Collection = ({ images }) => {
  return (
    <Container>
      <Grid container>
        {images.map((i) => (
          <DataCard data={i} key={i.data[0].nasa_id} />
        ))}
      </Grid>
    </Container>
  );
};

export default Collection;
