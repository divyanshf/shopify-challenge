import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";

const WaitComponent = ({ message }) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CardMedia
          component="img"
          image={process.env.PUBLIC_URL + "/wait.svg"}
          sx={{ width: "100%", maxWidth: 250 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" sx={{ color: "warning.main" }}>
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WaitComponent;
