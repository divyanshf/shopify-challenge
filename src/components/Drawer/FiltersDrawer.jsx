import { Close, Settings } from "@mui/icons-material";
import {
  SwipeableDrawer as Drawer,
  IconButton,
  List,
  ListItem,
  Switch,
  Typography,
  Divider,
  useMediaQuery,
  InputLabel,
  Select,
  Grid,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { FilterOptions } from "../../contexts/FilterOptions";

const FilterDrawerComponent = ({ open, handleClose }) => {
  const [filters, changeFilters] = useContext(FilterOptions);
  const [filtersCopy, setFiltersCopy] = useState(filters);

  const handleSelect = (e) => {
    setFiltersCopy((prev) => {
      return prev.map((o) => {
        if (o.key !== e.target.name) return o;
        o.value = e.target.value;
        return o;
      });
    });
  };

  const onSubmit = () => {
    changeFilters(filtersCopy);
    handleClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="bottom"
      onOpen={() => {}}
      sx={(theme) => ({
        width: 250,
      })}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ px: 2 }}>
          Filters
        </Typography>
        <Grid container>
          {filters.map((f) => {
            return (
              <Grid item key={f.key} sx={{ p: 2 }}>
                <FormControl variant="standard">
                  <InputLabel id={f.key}>{f.title}</InputLabel>
                  <Select
                    labelId={f.key}
                    label={f.title}
                    onChange={handleSelect}
                    name={f.key}
                    value={f.value}
                  >
                    {f.options.map((o, i) => (
                      <MenuItem value={o} key={i}>
                        {typeof o === "string" ? o.toUpperCase() : o}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="success" onClick={onSubmit}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawerComponent;
