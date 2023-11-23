const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const User = require("../models/usersModel");
const { jwtSecret } = require("../../secret");
const { accessTokenCookie } = require("../helper/cookie");
const { successResponse } = require("./responseController");
const { jsonWebTokenNoTimeOut } = require("../helper/jsonWebToken");

const handleLogInUser = async (req, res, next) => {
  try {
    if (req.cookies.accessToken) {
      throw createError(400, "User is already logged in. ");
    }
    const { email, password } = req.body;
    console.log(email, password);

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
    const accessToken = jsonWebTokenNoTimeOut({ user }, jwtSecret);

    //create access Token cookie
    accessTokenCookie(res, accessToken);

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

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { handleLogInUser, handleLogOutUser };
