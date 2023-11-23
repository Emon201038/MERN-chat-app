const jwt = require("jsonwebtoken");

const jsonWebToken = (payload, secretKey, expiresIn = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

const jsonWebTokenNoTimeOut = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

module.exports = { jsonWebToken, jsonWebTokenNoTimeOut };
