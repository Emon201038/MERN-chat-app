const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/usersModel");
const { jwtAccessTokenSecret, jwtRefreshTokenSecret } = require("../../secret");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helper/cookie");
const { successResponse } = require("./responseController");
const { jsonWebToken } = require("../helper/jsonWebToken");

const handleLogInUser = async (req, res, next) => {
  try {
    if (req.cookies.accessToken) {
      throw createError(400, "User is already logged in. ");
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User not found with this email. Please register first ."
      );
    }

    const isPassworMatch = await bcrypt.compare(password, user.password);

    if (!isPassworMatch) {
      throw createError(404, "Wrong password.");
    }

    //create jwt token
    const accessToken = jsonWebToken({ user }, jwtAccessTokenSecret, "15m");
    const refreshToken = jsonWebToken({ user }, jwtRefreshTokenSecret, "1d");

    //create access Token cookie
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    const userWithoutPass = await User.findOne({ email }).select("-password");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { userWithoutPass },
    });
  } catch (error) {
    return next(error);
  }
};

const handleLogOutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const handleRefreshToken = (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw createError(
        400,
        "You are not login to get refresh token. Login first."
      );
    }
    const decode = jwt.decode(oldRefreshToken);
    const accessToken = jsonWebToken(
      { user: decode.user },
      jwtAccessTokenSecret,
      "15m"
    );
    setAccessTokenCookie(res, accessToken);

    return successResponse(res, {
      statusCode: 200,
      message: "new access token generated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogInUser, handleLogOutUser, handleRefreshToken };
