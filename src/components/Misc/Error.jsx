import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";

const ErrorComponent = ({ message }) => {
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
          image={process.env.PUBLIC_URL + "/sad.svg"}
          sx={{ width: "100%", maxWidth: 400 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" color="error">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorComponent;
