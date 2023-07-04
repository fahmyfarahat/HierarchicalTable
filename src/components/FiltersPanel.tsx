import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Filter {
  name: string;
  options: string[];
}

export default function FiltersPanel({ filters }: { filters: Filter[] }) {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (event: SelectChangeEvent, name: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: event.target.value as string,
    }));
  };

  return (
    <>
      {filters.map((filter, index) => {
        return (
          <Box sx={{ minWidth: 120 }} key={index}>
            <FormControl fullWidth>
              <InputLabel>{filter.name}</InputLabel>
              <Select
                style={{
                  width: 144,
                }}
                variant="filled"
                value={values[filter.name] || ""}
                label={filter.name}
                onChange={(e) => handleChange(e, filter.name)}
              >
                {filter.options.map((value, optionIndex) => (
                  <MenuItem value={value} key={optionIndex}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      })}
    </>
  );
}
