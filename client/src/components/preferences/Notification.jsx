import { Box, Switch, Typography } from "@mui/material";

const Notification = ({ checked, setChecked }) => {
  return (
    <div>
      <Box p={2}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize={20} mb={1}>
          Notifications
        </Typography>
        <Typography variant="body2" fontWeight="bold" fontSize={14} mb={2}>
          Mute all notifications
        </Typography>
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </Box>
    </div>
  );
};

export default Notification;
