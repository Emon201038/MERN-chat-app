import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSentOtpMutation } from "../../features/forget password/forgetPassApi";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (location.state && location.state.selectedUser) || {};
  const [value, setValue] = useState("code");

  const [sentOtp, { isLoading }] = useSentOtpMutation();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    if (value === "login") {
      navigate(`/forget-password/confirmation/${user._id}/login`, {
        state: { user: user },
      });
    } else if (value === "code") {
      await sentOtp({ email: user.email });
      navigate(`/forget-password/confirmation/${user._id}/reset-password`, {
        state: { user: user },
      });
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor="rgb(203,213,225)"
    >
      <Stack
        sx={{
          width: {
            xs: "90%",
            sm: "70%",
            md: "50%",
            lg: "35%",
            xl: "35%",
          },
          bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Typography
          padding="20px"
          borderBottom="1px solid lightgray"
          fontWeight={600}
          fontSize={20}
        >
          Reset Your Password
        </Typography>
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          borderBottom="1px solid lightgray"
        >
          <Stack width="60%" padding="20px" spacing={2}>
            <Typography>
              How do you want to receive the code to reset your password?
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="code"
                  control={<Radio />}
                  label={
                    <Typography variant="body2">
                      Send code via email
                      <Typography variant="body2" color="textSecondary">
                        {user?.email}
                      </Typography>
                    </Typography>
                  }
                  sx={{ fontSize: 8 }}
                />
                <FormControlLabel
                  value="login"
                  control={<Radio />}
                  label={
                    <Typography variant="body2">
                      Enter Password to Log In
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack
            width="40%"
            height="100%"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ width: 50, height: 50 }} src={user?.image} />
            <Typography>{user?.firstName + " " + user?.lastName}</Typography>
          </Stack>
        </Stack>
        <Stack
          width="100%"
          height="70px"
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing={2}
          paddingX="20px"
        >
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ fontWeight: 800, fontSize: 13 }}
            onClick={() => navigate("/forget-password")}
          >
            <Typography color="textSecondary" fontWeight="800" fontSize={12}>
              Not you?
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ fontWeight: 700, fontSize: 12 }}
            onClick={handleClick}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size="20px" />}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Confirmation;
