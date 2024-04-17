const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    sameSite: "none",
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
