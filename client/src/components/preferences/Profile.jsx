import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Stack padding={2} spacing={2}>
      <Box>
        <Typography variant="caption">First Name: </Typography>
        <Typography>{user.firstName}</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Last Name: </Typography>
        <Typography>{user.lastName}</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Email: </Typography>
        <Typography>{user.email}</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Phone: </Typography>
        <Typography>{user.phone}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ marginTop: "20px" }}
        onClick={() => navigate(`/profile/edit/${user._id}`)}
      >
        Edit Profile
      </Button>
    </Stack>
  );
};

export default Profile;
