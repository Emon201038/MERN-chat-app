import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import logo from "../../images/chat-app-icon-5.jpg";
import Button from "@mui/material/Button";
import {
  Facebook,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Alert, CircularProgress, Divider, Snackbar } from "@mui/material";

/*eslint-disable react/prop-types*/
const LoginForm = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [login, { data, isLoading, error: responseError }] = useLoginMutation();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isCreated = location.state && location.state?.createdUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (responseError?.data?.message) {
      setError(responseError?.data?.message);
    }
    if (data?.payload?.userWithoutPass) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  const { email, password } = formData;

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  // Function to handle snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isCreated) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [isCreated]);

  return (
    <>
      <div>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000} // Adjust as needed
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success">
            Account created successful.Please log in now.
          </Alert>
        </Snackbar>
        <div className="h-[100vh] w-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center w-[400px] h-auto flex-col m-1 py-3 gap-1  rounded-lg "
          >
            <div className="w-full flex justify-start flex-col ml-10 gap-3">
              <div className="w-full flex justify-center ml-[-30px] mb-[30px]">
                <img src={logo} className="w-[40px] h-[40px]" alt="" />
              </div>
              <h1 className="font-semibold text-lg">
                Login to <span className="font-mono font-bold">Lets Talk</span>
              </h1>
              <h3 className="text-sm">
                New Chat app ?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate("/registration")}
                >
                  {" "}
                  Create an account
                </span>
              </h3>
            </div>
            <div className="email w-full h-auto flex flex-col justify-center items-center my-2">
              <label
                htmlFor="email"
                className="flex w-full justify-start ml-[40px]"
              >
                Email or Phone{" "}
                <span className="text-red-600 text-lg px-1">* </span>:
              </label>
              <input
                required
                type="text"
                placeholder="Email or Phone"
                className={`px-2 rounded outline-none w-11/12 h-10 border-[1px] border-blue-400
          `}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="password w-full h-auto flex flex-col justify-center items-center relative ">
              <label
                htmlFor="password"
                className="flex w-full justify-start ml-[40px]"
              >
                Password <span className="text-red-600 text-lg px-1">* </span>:
              </label>
              <div
                className="eye w-[30px] h-[34px] rounded-r absolute left-[353px] top-7 bg-slate-400 flex justify-center items-center"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <Visibility
                    sx={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOff sx={{ width: "18px", height: "18px" }} />
                )}
              </div>
              <input
                required
                type={`${showPass ? "text" : "password"}`}
                placeholder="WsuyDFHjf@3f7"
                className="p-1 rounded w-11/12 outline-none px-3 pr-9 border-[1px] border-blue-400"
                name="password"
                value={password}
                onChange={handleChange}
                minLength={6}
                maxLength={20}
              />
              <div
                className={`error absolute top-16 text-[12px] text-red-500 left-5 ${
                  error ? "block" : "hidden"
                }`}
              >
                {error}
              </div>
            </div>
            <div className="w-full flex justify-end mr-9 mb-2 text-[12px] underline cursor-pointer">
              <Link to="/forget-password">Forgot Password?</Link>
            </div>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "91.6%" }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              type="submit"
              disabled={isLoading}
            >
              Log In
            </Button>
          </form>
          <div className="flex items-center my-5 w-[320px]">
            <Divider color="black" sx={{ width: "100%" }}>
              OR
            </Divider>
          </div>
          <div className="flex items-center w-[300px] h-9  justify-center gap-9">
            <div className="text-red-500 cursor-pointer">
              <Google />
            </div>
            <div className="text-blue-600 cursor-pointer">
              <Twitter />
            </div>
            <div className="text-blue-600 cursor-pointer">
              <Facebook />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
