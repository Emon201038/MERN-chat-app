const createError = require("http-errors");

const User = require("../models/usersModel");
const { findUser } = require("../services/findUser");
const { successResponse } = require("./responseController");
const FriendRequest = require("../models/friendRequestModel");

const handleGetFriends = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";

    const thisUser = await User.findById(req.user._id)
      .select("-password")
      .populate("friends", "-password");
    const friends = thisUser.friends.filter((friend) => {
      const fullName = friend.firstName + " " + friend.lastName;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Find friends successfully",
      payload: { friends },
    });
  } catch (err) {
    return next(err);
  }
};

const handleGetFriendById = async (req, res, next) => {
  try {
    const friendsId = req.query.friendsId || [];
    const idArray = friendsId?.split(",")?.map((id) => id?.trim());
    if (!friendsId) {
      throw createError(400, "Id needed");
    }

    const user = await User.find({ _id: { $in: idArray } });

    if (user.length <= 0) {
      throw createError(404, "No Friends found");
    } else {
      return successResponse(res, {
        statusCode: 200,
        message: "Friend was found",
        payload: { user },
      });
    }
  } catch (error) {
    next(error);
  }
};

const handleGetFriendsRequest = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const { user } = req;
    const requests = await FriendRequest.find({ recipient: user._id }).populate(
      "sender",
      "-password"
    );

    const request = requests.filter((req) => {
      const fullName = req?.sender?.firstName + " " + req?.sender?.lastName;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!request) {
      throw createError(404, "No Friend Request Found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Friend Request list found successfully",
      payload: { requests: request },
    });
  } catch (error) {
    next(error);
  }
};

const handleCreateFriendRequest = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const existCheck = await FriendRequest.find({
      $or: [
        { sender: from, recipient: to },
        { recipient: from, sender: to },
      ],
    });
    console.log(existCheck);

    if (existCheck.length > 0) {
      throw createError(409, "Already have friend request");
    }

    const newRequest = await FriendRequest.create({
      sender: from,
      recipient: to,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Friend request created successfully",
      payload: { newRequest },
    });
  } catch (error) {
    return next(error);
  }
};

const handleRecommandedUser = async (req, res, next) => {
  const search = req.query.search || "";
  const seachRegExp = new RegExp(".*" + search + ".*", "i");
  const thisUser = req.user;

  const searchFilter = {
    _id: { $ne: thisUser._id },
    $or: [
      { firstName: { $regex: seachRegExp } },
      { lastName: { $regex: seachRegExp } },
    ],
  };

  try {
    const allUser = await User.find(searchFilter);
    const allRequests = await FriendRequest.find({
      $or: [{ sender: thisUser._id }, { recipient: thisUser._id }],
    });

    successResponse(res, {
      statusCode: 200,
      message: "Recommanded user found successfully",
      payload: { remainingUser: allUser, allRequests },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetFriends,
  handleGetFriendById,
  handleGetFriendsRequest,
  handleCreateFriendRequest,
  handleRecommandedUser,
};
