const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { jwtAccessTokenSecret } = require("../../secret");
const { successResponse } = require("./responseController");
const { query } = require("express");
const handleCreateComment = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const text = req.body?.text;
    const file = req.body?.file;
    const parent = req.body?.parent;

    console.log(text);
    if (!text && !file) {
      throw createError(400, "comment cannot be empty");
    }

    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const creator = decodedToken.user._id;

    const isExist = await Post.exists({ _id: postId });
    if (!isExist) {
      throw createError(404, "No post found with this id");
    }

    const info = {
      comment: {},
      user: creator,
      reactions: [],
      postId: postId,
    };

    if (parent) {
      info.parent = parent;
    }

    if (text && !file) {
      info.comment.text = text;
    }
    if (text && file) {
      info.comment.text = text;
      info.comment.image = file;
    }
    if (!text && file) {
      info.comment.image = file;
    }

    const comment = await Comment.create(info);

    return successResponse(res, {
      statusCode: 200,
      message: "comment added successfull",
      payload: comment,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCommentByPostId = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      throw createError(400, "Post id is required");
    }

    const comments = await Comment.find({ postId: postId });

    if (!comments) {
      throw createError(404, "No comment found with this post id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "comment fetched successfull",
      payload: { comments },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const text = req.body?.text;
    const file = req.body?.file;
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(commentId);

    if (!commentId) {
      throw createError(400, "comment id is required");
    }

    if (!isMongoId) {
      throw createError(
        400,
        "Invalid comment id. It must be a valid mongodbId"
      );
    }

    const update = { comment: {} };

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw createError(404, "comment not found");
    }
    if (!comment.comment.file && !text) {
      throw createError(400, "comment cannot be empty");
    }

    if (comment.comment.file && !text) {
      update.comment.file = comment.comment.file;
    }
    if (comment.comment.file && text) {
      update.comment.file = comment.comment.file;
      update.comment.text = text;
    }
    if (!comment.comment.file && text) {
      update.comment.text = text;
    }

    const updateOptions = {
      new: true,
      context: query,
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      update,
      updateOptions
    );

    return successResponse(res, {
      statusCode: 200,
      message: "comment update successfull",
      payload: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const userId = decodedToken.user._id;

    const comment = await Comment.findById(commentId).populate([
      { path: "postId", select: "creator" },
    ]);
    if (!comment) {
      throw createError(404, "No comment found with this id");
    }

    const postOwnerId = comment.postId.creator.toString();
    const commentOwnerId = comment.user.toString();

    if (postOwnerId !== userId && commentOwnerId !== userId) {
      throw createError(403, "You are not authorized to delete this comment");
    }

    await Comment.deleteMany({ parent: commentId });
    await Comment.findByIdAndDelete(commentId);

    return successResponse(res, {
      statusCode: 200,
      message: "comment deleted successfull",
      payload: comment,
    });
  } catch (error) {
    next(error);
  }
};

const handleReactInComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { react } = req.body;

    if (!react) {
      throw createError(400, "reaction type is required");
    }

    const isValidReact = [
      "like",
      "love",
      "care",
      "wow",
      "sad",
      "angry",
    ].includes(react);
    if (!isValidReact) {
      throw createError(
        400,
        "Invalid react. React must be one of: like, love, care, wow, sad, angry"
      );
    }

    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const reactorId = decodedToken.user._id;

    let update;
    let options = { new: true, context: query }; // To return the updated document

    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw createError(404, "No post found with this ID");
    }

    const existingReactionIndex = comment.reactions.findIndex(
      (reaction) => reaction.user.toString() === reactorId
    );

    // If the user has already reacted with the same reaction type, remove the reaction
    if (
      existingReactionIndex !== -1 &&
      comment.reactions[existingReactionIndex].react === react
    ) {
      update = {
        $pull: { reactions: { user: reactorId, react } }, // Remove the reaction
      };
    } else {
      // If the user has reacted with a different reaction type or hasn't reacted yet, update the reaction
      const newReaction = { react, user: reactorId };
      update =
        existingReactionIndex !== -1
          ? { $set: { [`reactions.${existingReactionIndex}`]: newReaction } } // Replace existing reaction
          : { $push: { reactions: newReaction } }; // Add new reaction
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      update,
      options
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Reaction updated successfully",
      payload: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateComment,
  handleGetCommentByPostId,
  handleUpdateComment,
  handleDeleteComment,
  handleReactInComment,
};
