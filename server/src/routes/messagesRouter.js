const express = require("express");
const {
  handleCreateConversation,
  handleGetConversations,
  handleCreateMessage,
  handleGetMessages,
} = require("../controllers/messagesController");
const { isLoggedIn } = require("../middlewares/auth");
const { validateTextMessage } = require("../validators/auth");
const runvalidation = require("../validators/index");

const messagesRouter = express.Router();

messagesRouter.post("/", isLoggedIn, handleCreateConversation);
messagesRouter.post(
  "/message/:conversationId",
  isLoggedIn,
  validateTextMessage,
  runvalidation,
  handleCreateMessage
);
messagesRouter.get("/", isLoggedIn, handleGetConversations);
messagesRouter.get("/message/:conversationId", isLoggedIn, handleGetMessages);

module.exports = messagesRouter;
