const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtRefreshTokenSecret, jwtAccessTokenSecret } = require("../../secret");

const isLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, "No access token found.please log in");
    }
    const decode = jwt.verify(accessToken, jwtAccessTokenSecret);
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
