import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Stack
      padding={4}
      pl={6}
      spacing={2}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="start"
    >
      <Box>
        <img
          src={user.image}
          className="w-[60px] h-[60px] rounded-full"
          alt=""
        />
      </Box>
      <Box>
        <Typography variant="caption">First Name: </Typography>
        <Typography sx={{ fontSize: "16px", letterSpacing: "1px" }}>
          {user.firstName}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "14px" }}>Last Name: </Typography>
        <Typography sx={{ fontSize: "16px", letterSpacing: "1px" }}>
          {user.lastName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Email: </Typography>
        <Typography sx={{ fontSize: "16px", letterSpacing: "1px" }}>
          {user.email}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Phone: </Typography>
        <Typography sx={{ fontSize: "16px", letterSpacing: "1px" }}>
          {user.phone}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ marginTop: "20px", width: "200px" }}
        onClick={() => navigate(`/profile/edit/${user._id}`)}
      >
        Edit Profile
      </Button>
    </Stack>
  );
};

export default Profile;
