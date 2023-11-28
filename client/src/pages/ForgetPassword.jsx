import { Button, Stack, TextField, Typography } from "@mui/material";
import logo from "../images/chat-app-icon-5.jpg";
import { Link } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";

const ForgetPassword = () => {
  return (
    <Stack marginTop={15} alignItems="center">
      <Stack spacing={4} width={450} direction="column">
        <Stack spacing={2}>
          <div className="flex justify-center">
            <img src={logo} className="w-[40px] h-[40px]" alt="" />
          </div>
          <Typography variant="h5" fontWeight={600}>
            Forgot your password?
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="body2">
            {" "}
            Please enter the email address associated with your account and we
            will send an otp to this email to reset your password.
          </Typography>
          <TextField size="small" label="Email address" type="email" required />
          <Button variant="contained" color="primary">
            Send request
          </Button>
          <Link to="/">
            <Stack direction="row" alignItems="center">
              <KeyboardArrowLeft />
              <Typography variant="body2" fontWeight={100}>
                Return to sing in
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ForgetPassword;
