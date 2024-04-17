import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {} from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../features/forget password/forgetPassApi";
import { useTheme } from "@emotion/react";

/*eslint-disable react/no-unescaped-entities*/
const CodeVerification = () => {
  const [value, setValue] = useState("");
  const [verifyOtp, { data, isError, isLoading, error }] =
    useVerifyOtpMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = useTheme();
  const user = (location.state && location.state.user) || {};
  console.log(user);

  const handleChange = (e) => {
    setValue(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp({ code: value, email: user.email });
  };

  useEffect(() => {
    if (data?.success) {
      console.log("success");
    }
  }, [data]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor={currentTheme.palette.mode === "light" && "rgb(203,213,225)"}
    >
      <Stack
        //
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "50%",
            lg: "35%",
            xl: "35%",
          },
          bgcolor:
            currentTheme.palette.mode === "light" ? "white" : "rgba(0,0,0,0.3)",
          borderRadius: "10px",
        }}
      >
        <Typography
          borderBottom="1px solid lightgray"
          fontWeight={600}
          fontSize={20}
          padding={2}
        >
          Enter security code
        </Typography>
        <Box
          borderBottom={
            currentTheme.palette.mode === "light"
              ? "1px solid lightgray"
              : "1px solid rgba(255,255,255,0.3)"
          }
          padding={2}
        >
          <Typography>
            Please check your emails for a message with your code. Your code is
            6 numbers long.
          </Typography>
          <Stack direction="row" width="100%" paddingTop={2.5}>
            <form onSubmit={handleSubmit}>
              <TextField
                error={isError}
                size="small"
                id="outlined-error-helper-text"
                helperText={error?.data?.message}
                placeholder="Enter code"
                value={value}
                onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                FormHelperTextProps={{
                  style: {
                    margin: "0px", // Adjust the margin as needed
                  },
                }}
              />
            </form>
            <Box variant="body2" paddingLeft={2}>
              <Typography variant="body2" marginBottom={1}>
                We have sent your code to:{" "}
              </Typography>
              <Typography fontSize="12px">{user?.email}</Typography>
            </Box>
          </Stack>
        </Box>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          padding={2}
        >
          <Typography
            variant="body2"
            fontSize="12px"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            color="#1877f2"
          >
            Didn't get a code?
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="inherit"
              size="medium"
              sx={{ marginRight: "8px" }}
              onClick={() => navigate("/")}
            >
              <Typography color="textSecondary" fontWeight="800" fontSize={12}>
                Cancel
              </Typography>
            </Button>
            <Button
              variant={currentTheme.palette.mode === "light" && "primary"}
              // color={currentTheme.palette.mode === "light" && "primary"}
              size="medium"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size="20px" />}
            >
              <Typography fontWeight="800" fontSize={12}>
                continue
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CodeVerification;
