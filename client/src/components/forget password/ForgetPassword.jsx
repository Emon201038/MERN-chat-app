import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../images/chat-app-icon-5.jpg";
import { Link } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSearchUserMutation } from "../../features/forget password/forgetPassApi";
import Indentify from "./Indentify";

const ForgetPassword = () => {
  const [searchUser, { data, isLoading, isError }] = useSearchUserMutation();
  const [email, setEmail] = useState("");
  const [showIdentity, setShowIdentity] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchUser({ email: email });
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (!isLoading && !isError && data?.payload?.user?.length > 0) {
      setShowIdentity(true);
    }
  }, [data, isLoading, isError]);
  return (
    <>
      {!showIdentity ? (
        <Box
          width="100vw"
          height="100vh"
          bgcolor="rgb(203,213,225)"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: {
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "60%",
                xl: "50%",
              },
              bgcolor: "white",
              borderRadius: "8px",
              paddingX: {
                xs: "10px",
                sm: "10px",
                md: "10px",
                lg: "0px",
                xl: "0px",
              },
              paddingY: "10px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} direction="column">
                <Stack spacing={2}>
                  <div className="flex justify-center">
                    <img src={logo} className="w-[40px] h-[40px]" alt="" />
                  </div>
                  <Typography variant="h5" fontWeight={600}>
                    Find Your Account
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="body2">
                    Please enter the email address or phone number associated
                    with your account to search for your account.
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="Email or Phone number"
                    type="text"
                    name="email"
                    required
                    value={email}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "100%", height: "40px" }}
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    startIcon={
                      isLoading && (
                        <CircularProgress color="secondary" size="1.5rem" />
                      )
                    }
                  >
                    Search
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
            </form>
          </Stack>
        </Box>
      ) : (
        <Indentify
          onBack={() => setShowIdentity(false)}
          users={data?.payload?.user}
        />
      )}
    </>
  );
};

export default ForgetPassword;
