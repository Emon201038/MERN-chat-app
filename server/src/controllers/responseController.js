const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  res
    .status(statusCode)
    .json({ success: true, message: message, payload: payload });
};

const errorResponse = (res, { statusCode = 400, message = "Error" }) => {
  res.status(statusCode).json({ success: false, message: message });
};

module.exports = { successResponse, errorResponse };
