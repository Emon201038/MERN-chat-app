const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../secret");

const isLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(404, "No access token found.please log in");
    }
    const decode = jwt.verify(accessToken, jwtSecret);
    if (!decode) {
      throw createError(404, "cannot decode user.");
    }

    req.user = decode.user;

    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
      throw createError(404, "User is already logged in. ");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut };
