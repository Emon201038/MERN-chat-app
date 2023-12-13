import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "../../context/ThemeProvider";

const Apperance = ({ theme, setTheme }) => {
  const { toggleTheme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.target.value);
    toggleTheme();
  };

  return (
    <div>
      <div>
        <Box p={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            fontSize={20}
            mb={1}
          >
            Appearence
          </Typography>
          <Typography variant="body2" fontWeight="bold" fontSize={14} mb={2}>
            Theme
          </Typography>
          <FormControl fullWidth className="mainForm">
            <Select
              value={theme}
              label="Age"
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
              sx={{ height: "40px" }}
            >
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="light">Light</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default Apperance;
