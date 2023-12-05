import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/chat-app-icon-5.jpg";
import { useVerifyUerMutation } from "../features/auth/authApi";
import { useEffect, useState } from "react";
import { DraftsOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress } from "@mui/material";

const Activate = () => {
  const [isCreated, setIsCreated] = useState("");
  const [verify, { data, isLoading, isError, error }] = useVerifyUerMutation();
  const { token } = useParams();
  const navigate = useNavigate();
  const mainToken = token.split("@").join(".");
  const isValidJwt = /^[\w-]+@[\w-]+@[\w-]+$/.test(token);
  if (!isValidJwt) {
    console.log("Invalid JWT token format");
  }
  const handleClick = async () => {
    await verify({ token: mainToken });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setIsCreated(data?.payload);
    }
  }, [data]);

  if (isCreated) {
    navigate("/", { state: { createdUser: isCreated } });
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center flex-col overflow-hidden">
      <Box
        sx={{
          width: {
            lg: "60%",
            md: "70%",
            sm: "90%",
            xs: "90%",
          },
          height: {
            xl: "50%",
            lg: "60%",
            md: "65%",
            sm: "70%",
            xs: "75%",
          },
        }}
        className="bg-white shadow-lg overflow-y-hidden rounded"
      >
        <div className="logo w-full h-[60px] flex justify-center items-center ">
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
              border: "2px solid rgb(45,212,191)",
            }}
            src={logo}
          />
        </div>
        <div className="logo w-full h-[60px] bg-gradient-to-r from-green-400 to-blue-300 flex justify-center items-center ">
          <div className="logo bg-white w-[50px] h-[50px]  rounded-full flex justify-center items-center ">
            <div className="w-[30px] h-[30px] text-red-400 text-center">
              <DraftsOutlined />
            </div>
          </div>
        </div>
        <div className="textConten flex flex-col w-full justify-center items-center h-[50.75vh] lg:h-[30vh]">
          <h1 className="p-2 text-2xl font-semibold w-full flex justify-center">
            Email verification completed
          </h1>
          <h3 className="px-5 py-3 ">
            Now you can start enjoying our app. For this you have to click
            verify button below <br /> <br />
            Our chat privacy is stronger. No one can know what you chat with
            some except you and someone even though our admin is unable to
            access your conversation.
            <br />
          </h3>
          <div className="button w-full flex justify-center">
            <Button
              sx={{
                width: "66.66%",
                background: "linear-gradient(to right, #06b6d4,#3b82f6)",
                color: "white",
                height: "36px",
                marginTop: "8px",
              }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size="20px" />}
              onClick={handleClick}
            >
              verify
            </Button>
          </div>
          {isError && <div className="text-red-500">{error.data.message}</div>}
        </div>
      </Box>
    </div>
  );
};

export default Activate;
