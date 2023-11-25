/*eslint-disable react/no-unescaped-entities*/
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  checkPhoneLength,
  isEmailValid,
  validatePassword,
} from "../../utils/auth";
import { useRegisterMutation } from "../../features/auth/authApi";
import { uploadImage as saveImage } from "../../utils/uploadImage";
import logo from "../../images/chat-app-icon-5.jpg";
import {
  Facebook,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

/*eslint-disable react/prop-types*/
const RegistrationForm = () => {
  const [errorShow, setErrorShow] = useState(false);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [matchPass, setMatchPass] = useState(true);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState(null);

  const { firstName, lastName, email, password, confirmPassword, phone } =
    formData;
  const [registration, { data, isLoading, error: responseError }] =
    useRegisterMutation();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorShow(true);
    }

    if (password !== confirmPassword) {
      setMatchPass(false);
    } else {
      setMatchPass(true);
      if (
        firstName &&
        lastName &&
        isEmailValid(email) &&
        validatePassword(password)
      ) {
        if (image) {
          const imageData = new FormData();
          imageData.append("file", image);
          imageData.append("cloud_name", "emadul-hoque-emon");
          imageData.append("upload_preset", "chat-app");
          imageData.append("public_id", lastName);

          const imageUrl = await saveImage(imageData);
          if (imageUrl) {
            await registration({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              password: password,
              image: imageUrl,
            });
          }
        } else {
          await registration(formData);
        }
      }
    }
  };
  useEffect(() => {
    if (data) {
      navigate("/verify", { state: { from: "/register" } });
    }
  }, [responseError, data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const inputRefs = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    phone: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };
  let borderClass = "border-[1px] border-blue-400"; // Initialize the border class variable

  const checkPass = validatePassword(password);
  const handleLabelClick = (inputName) => {
    inputRefs[inputName].current.focus();
  };

  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-[400px] h-auto flex-col m-1 py-1 gap-1  rounded-lg "
      >
        <div>
          <img src={logo} className="w-[40px] h-[40px]" alt="" />
        </div>
        <div className="w-full flex justify-start flex-col ml-10 gap-3">
          <h1 className="font-semibold  text-lg">
            Get started with{" "}
            <span className="font-mono font-bold">Lets Talk</span>
          </h1>
          <h3 className="text-sm">
            Already have an account ?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              {" "}
              Log In
            </span>
          </h3>
        </div>
        <div className="name-section flex w-full justify-between px-5 pt-3 pb-1 ">
          <div
            className="name-section w-1/2 h-auto flex flex-col justify-start relative
           "
          >
            <label
              htmlFor="firstName"
              className={`text-sm text-center flex px-2  absolute top-2 left-3 transform transition-transform ${
                isFocused.firstName || firstName
                  ? "translate-y-[-90%] bg-white"
                  : ""
              } `}
              onClick={() => handleLabelClick("firstName")}
            >
              First Name
              {firstName.length > 0 || isFocused.firstName ? (
                <span className=" text-red-600">* </span>
              ) : (
                ""
              )}
            </label>
            <input
              required
              type="text"
              id="firstName"
              className={`px-4 rounded outline-none w-[170px] h-10  ${
                firstName.length > 0 && firstName.length < 2
                  ? "border-2 border-red-500"
                  : firstName.length >= 2
                  ? "border-2 border-green-500"
                  : "border-[1px] border-blue-400"
              } `}
              name="firstName"
              value={firstName}
              onChange={handleChange}
              onFocus={() => setIsFocused({ ...isFocused, firstName: true })}
              onBlur={() => setIsFocused({ ...isFocused, firstName: false })}
            />
          </div>
          <div className="last-name  h-auto flex flex-col justify-center items-center relative">
            <label
              htmlFor="lastName"
              className={`text-sm text-center flex px-2  absolute top-2 left-3 transform transition-transform ${
                isFocused.lastName || lastName
                  ? "translate-y-[-90%] bg-white"
                  : ""
              } `}
              onClick={() => handleLabelClick("lastName")}
            >
              Last Name
              {lastName.length > 0 || isFocused.lastName ? (
                <span className=" text-red-600">* </span>
              ) : (
                ""
              )}
            </label>
            <input
              required
              type="text"
              id="lastName"
              className={`px-4 rounded outline-none w-[170px] h-10  ${
                lastName.length > 0 && lastName.length < 2
                  ? "border-2 border-red-500"
                  : lastName.length >= 2
                  ? "border-2 border-green-500"
                  : "border-[1px] border-blue-400"
              } `}
              name="lastName"
              value={lastName}
              onChange={handleChange}
              onFocus={() => setIsFocused({ ...isFocused, lastName: true })}
              onBlur={() => setIsFocused({ ...isFocused, lastName: false })}
            />
          </div>
        </div>

        <div className="email-phone flex w-full justify-between px-5 pt-3 pb-1">
          <div className="email w-1/2 h-auto flex flex-col justify-start relative mb-2">
            <label
              htmlFor="email"
              className={`text-sm text-center flex px-2  absolute top-2 left-3 transform transition-transform ${
                isFocused.email || email ? "translate-y-[-90%] bg-white" : ""
              } `}
              onClick={() => handleLabelClick("email")}
            >
              Email
              {email.length > 0 || isFocused.email ? (
                <span className=" text-red-600">* </span>
              ) : (
                ""
              )}
            </label>
            <input
              required
              type="email"
              id="email"
              className={`px-2 rounded outline-none w-[190px] h-10  ${
                email.length > 0 && !isEmailValid(email)
                  ? "border-2 border-red-500"
                  : isEmailValid(email)
                  ? "border-2 border-green-500"
                  : "border-[1px] border-blue-400"
              }`}
              name="email"
              value={email}
              onChange={handleChange}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
            />

            {responseError && (
              <div className=" text-sm/[6px] tracking-wide absolute top-[40px] text-red-500 leading-3 w-[400px]">
                {responseError?.data?.message}
              </div>
            )}
          </div>
          <div className="phone  h-auto flex flex-col justify-center mb-2 items-center relative">
            <label
              htmlFor="phone"
              className={`text-sm text-center flex px-2  absolute top-2 left-3 transform transition-transform ${
                isFocused.phone || phone ? "translate-y-[-90%] bg-white" : ""
              } `}
              onClick={() => handleLabelClick("phone")}
            >
              Phone
              {phone.length > 0 || isFocused.phone ? (
                <span className=" text-red-600">* </span>
              ) : (
                ""
              )}
            </label>
            <input
              required
              type="text"
              id="phone"
              className={`w-[160px] h-10  py-2 px-3 rounded outline-none  ${
                checkPhoneLength(phone, borderClass)
                  ? checkPhoneLength(phone, borderClass)
                  : borderClass
              }`}
              name="phone"
              value={phone}
              onChange={handleChange}
              onFocus={() => setIsFocused({ ...isFocused, phone: true })}
              onBlur={() => setIsFocused({ ...isFocused, phone: false })}
            />
          </div>
        </div>
        <div className="password-both flex w-full justify-between px-5 pt-3 mb-5">
          <div
            className="password w-1/2 h-auto flex flex-col justify-start relative
           "
          >
            <TextField
              required
              type={`${showPass ? "text" : "password"}`}
              id="password"
              size="small"
              label="Password"
              sx={{ width: "160px" }}
              color={
                password.length > 0 && !checkPass
                  ? "error"
                  : password.length >= 6 && checkPass
                  ? "success"
                  : "primary"
              }
              name="password"
              value={password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? (
                        <VisibilityOff sx={{ width: "18px", height: "18px" }} />
                      ) : (
                        <Visibility sx={{ width: "18px", height: "18px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div
              className={`error text-sm/[6px] tracking-wide absolute top-[40px] text-red-500 leading-3 w-[400px] ${
                password.length > 0 || errorShow
                  ? validatePassword(password)
                    ? "hidden"
                    : "block"
                  : "hidden"
              }`}
            >
              Password must contail at least a uppercase,a lowercase, a number
              and a special charectes
            </div>
          </div>
          <div className="confirm-password  h-auto flex flex-col justify-center items-center relative">
            <TextField
              required
              label="Confirm Password"
              type={`${showPass ? "text" : "password"}`}
              id="confirmPassword"
              size="small"
              color={
                confirmPassword.length > 0
                  ? confirmPassword !== password || !checkPass
                    ? "error"
                    : "success"
                  : "primary"
              }
              sx={{
                width: "180px",
                "& .MuiFormLabel-root": {
                  fontSize: "14px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? (
                        <VisibilityOff sx={{ width: "18px", height: "18px" }} />
                      ) : (
                        <Visibility sx={{ width: "18px", height: "18px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            <div
              className={`error text-sm/[6px] tracking-wide absolute top-[40px] right-5 text-red-500 leading-3 w-[400px]   ${
                matchPass ? "hidden" : "flex justify-end"
              }`}
            >
              Password don't match
            </div>
          </div>
        </div>
        <div className="image w-full h-auto flex flex-col justify-start items-center ">
          <label htmlFor="file" className="flex w-full justify-start ml-[40px]">
            Profile picture:
          </label>
          <input
            type="file"
            name="image"
            id=""
            className="p-1 w-11/12 text-sm"
            onChange={handleImageUpload}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "91.6%" }}
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
          type="submit"
          disabled={isLoading}
        >
          Register
        </Button>
        <div className="text-[12px]">
          By signning up, I agree to{" "}
          <span className="font-semibold underline cursor-pointer">
            Term of service
          </span>{" "}
          and
          <span className="font-semibold underline cursor-pointer">
            {" "}
            Privacy Policy.
          </span>
        </div>
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
  );
};

export default RegistrationForm;
