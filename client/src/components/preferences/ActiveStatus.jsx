import { Box, Divider, Switch, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const ActiveStatus = ({ checked, setChecked }) => {
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <Box padding={1.5} pt={3}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize={20} mb={1}>
          Active status
        </Typography>
        <Typography variant="body2" fontWeight="bold" fontSize={15} mb={2}>
          Show active status
        </Typography>
        <Switch checked={checked} onChange={handleChange} />
        <Typography variant="subtitle1" fontSize={15} mb={1.5} fontWeight="800">
          Active status: {checked ? "on" : "off"}
        </Typography>
        <Divider sx={{ mb: "10px" }} />
        <Typography fontSize={12} sx={{ opacity: 0.5 }}>
          Your friends and contacts will see when you're active or recently
          active. You'll appear active or recently active unless you turn off
          the setting every place you're using Let's Talk Chat app. You'll also
          see when your friends and contacts are active or recently active.
        </Typography>
      </Box>
    </div>
  );
};

export default ActiveStatus;
