const createError = require("http-errors");

const Conversations = require("../models/conversationModel");
const { successResponse } = require("../controllers/responseController");
const OneToOneMessage = require("../models/messagesModel");

const handleCreateConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId && !receiverId) {
      throw createError(400, "Sender and receiver id needed");
    }

    const conversation = await Conversations.create({
      participients: [senderId, receiverId],
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Conversation created successfully",
      payload: { conversation },
    });
  } catch (error) {
    return next(error);
  }
};

const handleGetConversations = async (req, res, next) => {
  try {
    const conversation = await Conversations.find({
      participients: { $in: [req.user._id] },
    }).populate("participients", "-password");

    return successResponse(res, {
      statusCode: 200,
      message: "Conversation found successfully",
      payload: { conversation },
    });
  } catch (error) {
    return next(error);
  }
};

const handleGetSingleConversation = async (req, res, next) => {
  try {
    const { friendId } = req.params;

    const conversation = await Conversations.findOne({
      participients: { $in: [req.user._id, friendId] },
    });

    if (!conversation) {
      throw createError(404, "No conversation found with this friend");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Conversation found successfully",
      payload: { conversation },
    });
  } catch (error) {
    return next(error);
  }
};

const handleCreateMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { receiverId, text } = req.body;
    console.log(receiverId, text);

    const message = await OneToOneMessage.create({
      conversationId,
      sender: req.user._id,
      receiver: receiverId,
      text,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "message created successfully",
      payload: { message },
    });
  } catch (error) {
    return next(error);
  }
};

const handleGetMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.conversationId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const messagesArray = await OneToOneMessage.find({
      conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await OneToOneMessage.find({
      conversationId,
    }).countDocuments();

    const messages = messagesArray.reverse();

    return successResponse(res, {
      statusCode: 200,
      message: "Conversation found successfully",
      payload: {
        messages,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  handleCreateConversation,
  handleGetConversations,
  handleGetSingleConversation,
  handleCreateMessage,
  handleGetMessages,
};
