const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/usersModel");
const { successResponse } = require("./responseController");
const {
  jsonWebToken,
  jsonWebTokenNoTimeOut,
} = require("../helper/jsonWebToken");
const { jwtSecret, clientUrl } = require("../../secret");
const checkUserExists = require("../helper/checkUserExists");
const { query } = require("express");
const { sendEmailWithNodeMailer } = require("../helper/email");
const { emailTemplate } = require("../templates/emailTemplate");
const { accessTokenCookie } = require("../helper/cookie");

const handleGetUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const seachRegExp = new RegExp(".*" + search + ".*", "i");

    const searchFilter = {
      $or: [
        { firstName: { $regex: seachRegExp } },
        { lastName: { $regex: seachRegExp } },
        { phone: { $regex: seachRegExp } },
      ],
    };
    const { user } = req;

    const allUser = await User.find(searchFilter)
      .populate("friends")
      .limit(limit)
      .skip((page - 1) * limit);
    if (!allUser) {
      throw createError(404, "User not found");
    }

    const userWithoutMe = allUser.filter((usr) => usr !== user);

    const totalUser = await User.find(searchFilter).countDocuments();

    return successResponse(res, {
      statusCode: 200,
      message: "Users found successfully",
      payload: {
        userWithoutMe,
        pagination: {
          totalPages: Math.ceil(totalUser / limit),
          currentPage: page,
          previousPage: page - 1 >= 1 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(totalUser / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw createError(404, "Invalid id");
    }
    const user = await User.findById(id).select("-password");

    if (!user) throw createError(404, "No user found");

    return successResponse(res, {
      statusCode: 200,
      message: "Users found successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleProcessRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, image, password } = req.body;

    // const img = req.file;

    // if (img.size > 2 * 1024 * 1024) {
    //   throw createError(
    //     404,
    //     "Image size is too large.Image size must be maximum 2MB"
    //   );
    // }

    const userExists = await checkUserExists(User, email);
    if (userExists) {
      throw createError(
        409,
        "User already exists with the same email. Please login."
      );
    }
    const token = jsonWebToken(
      {
        firstName,
        lastName,
        email,
        phone,
        image,
        password: password,
      },
      jwtSecret,
      "15m"
    );

    console.log(token);

    const splitedToken = token.split(".").join("@");
    const url = `${clientUrl}/registration/activate/${splitedToken}`;

    const mailData = {
      email: email,
      subject: "Account Activation Email",
      html: emailTemplate(firstName, lastName, url),
    };

    await sendEmailWithNodeMailer(mailData);

    return successResponse(res, {
      statusCode: 200,
      message: `Account activation email sent to your email address.Please go to your ${email} account to activate.`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const handleActivateUser = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return createError(404, "Cannot verify user.");
    }

    try {
      const decoded = jwt.decode(token, jwtSecret);
      if (!decoded) {
        return createError(400, "User is unable to be activated.");
      }

      const userExists = await checkUserExists(User, decoded.email);
      if (userExists) {
        throw createError(
          409,
          "User is already exists with this email. Please Login."
        );
      }

      const newUser = await User.create(decoded);
      const newUserToken = jsonWebTokenNoTimeOut(decoded, jwtSecret);
      accessTokenCookie(res, newUserToken);
      return successResponse(res, {
        statusCode: 200,
        message: "New user has been activated",
        payload: newUser,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(404, "Token is expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw createError(404, "Invalid JSON Web Token");
      }
      console.log("error to create new user", error);
    }
  } catch (error) {
    throw error;
  }
};

const handleEditUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateOptions = {
      new: true,
      context: query,
    };
    const editedUser = await User.findByIdAndUpdate(
      id,
      { name },
      updateOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Edit user successfully",
      payload: { editedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError(400, "email is required");
    }
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      throw createError(404, "No user found with this email address");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User found successfully",
      payload: { user },
    });
  } catch (error) {}
};

module.exports = {
  handleGetUsers,
  handleGetUser,
  handleProcessRegister,
  handleActivateUser,
  handleEditUser,
  handleForgetPassword,
};
