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
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { FilterOptions } from "../../contexts/FilterOptions";

const FilterDrawerComponent = ({ open, handleClose }) => {
  const [filters, changeFilters] = useContext(FilterOptions);

  const handleSelect = (e) => {
    changeFilters(e.target.name, e.target.value);
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
        <Typography variant="h6">Filters</Typography>
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
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawerComponent;
