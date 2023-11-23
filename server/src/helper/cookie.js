const accessTokenCookie = (res, accessToken) => {
  return res.cookie("accessToken", accessToken, {
    sameSite: "none",
    httpOnly: false,
    secure: true,
  });
};

module.exports = { accessTokenCookie };
