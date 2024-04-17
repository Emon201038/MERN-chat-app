import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

/*eslint-disable react/prop-types*/
const Indentify = ({ onBack, users }) => {
  const currentTheme = useTheme();
  const navigate = useNavigate();
  const handleBack = () => {
    onBack();
  };
  const handleNavigate = (user) => {
    navigate(`/forget-password/confirmation/${user?._id}`, {
      state: { selectedUser: user },
    });
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      bgcolor={currentTheme.palette.mode === "light" && "rgb(203,213,225)"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack
        alignItems="center"
        sx={{
          bgcolor:
            currentTheme.palette.mode === "light" ? "white" : "rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Stack spacing={3} width={450} direction="column">
          <Stack spacing={4}>
            <Typography variant="h5">Identify Your Account</Typography>
            <Typography variant="body2">
              These accounts matched your search.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {users?.map((user) => (
              <Box key={user._id}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sizes="medium" src={user.image} />
                    <Typography variant="body1">
                      {user.firstName + " " + user.lastName}
                    </Typography>
                  </Stack>
                  <Button
                    sx={{
                      backgroundColor:
                        currentTheme.palette.mode === "light"
                          ? "rgb(203,213,225)"
                          : "rgba(25,25,225,0.6)",
                      paddingX: "5px",
                    }}
                    size="small"
                    color="inherit"
                    onClick={() => handleNavigate(user)}
                  >
                    This is my account
                  </Button>
                </Stack>
              </Box>
            ))}
            <Box sx={{ width: "100%", height: "30px", textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{
                  width: "20%",
                  height: "30px",
                  backgroundColor:
                    currentTheme.palette.mode === "light" && "rgb(203,213,225)",
                }}
                color="inherit"
                onClick={handleBack}
              >
                Back
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Indentify;
