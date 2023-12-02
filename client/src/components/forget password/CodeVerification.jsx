import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/*eslint-disable react/no-unescaped-entities*/
const CodeVerification = () => {
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor="rgb(203,213,225)"
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
          bgcolor: "white",
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
        <Box borderBottom="1px solid lightgray" padding={2}>
          <Typography>
            Please check your emails for a message with your code. Your code is
            6 numbers long.
          </Typography>
          <Stack direction="row" width="100%" paddingTop={2.5}>
            <TextField size="small" placeholder="Enter code" />
            <Box variant="body2" paddingLeft={2}>
              <Typography variant="body2" marginBottom={1}>
                We have sent your code to:{" "}
              </Typography>
              <Typography fontSize="12px">nasim@gmail.com</Typography>
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
              variant="contained"
              color="primary"
              size="medium"
              // onClick={handleClick}
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
