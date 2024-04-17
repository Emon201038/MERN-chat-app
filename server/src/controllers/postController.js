const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { query } = require("express");

const Post = require("../models/postModel");
const { successResponse } = require("./responseController");
const { jwtAccessTokenSecret } = require("../../secret");
const checkUserExists = require("../helper/checkUserExists");
const genarateHashTag = require("../helper/genarateHashTag");

const handleGetPosts = async (req, res, next) => {
  const posts = await Post.find().populate("creator");
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Post created successfull",
      payload: { posts },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("creator");
    if (!post) {
      throw createError(404, "No post found with this id");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Post created successfull",
      payload: post,
    });
  } catch (error) {
    next(error);
  }
};

const handleCreatePost = async (req, res, next) => {
  try {
    const text = req.body.text;
    const file = req.body?.file;

    const hashTag = genarateHashTag(text);
    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const creator = decodedToken.user._id;

    const postContent = {
      creator: creator,
      content: {
        caption: text,
      },
    };

    if (hashTag.length > 0) {
      postContent.content.hashTag = hashTag;
    }
    if (file) {
      postContent.content["file"] = file;
    }

    const post = await Post.create(postContent);

    return successResponse(res, {
      statusCode: 200,
      message: "Post created successfull",
      payload: post,
    });
  } catch (error) {
    next(error);
  }
};

const handleEditPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const text = req.body.text;
    const hashTag = genarateHashTag(text);

    const prevPost = await Post.findById(id);

    if (prevPost.content.caption) {
      if (!text) {
        throw createError(400, "You cannto remove all the text");
      }
    }
    const updateField = {
      content: {
        caption: text,
        hashTag: hashTag,
      },
    };
    const updateOptions = {
      new: true,
      context: query,
    };
    const post = await Post.findByIdAndUpdate(
      id,
      updateField,
      updateOptions
    ).populate("creator");
    return successResponse(res, {
      statusCode: 200,
      message: "Post edited successfull",
      payload: post,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExist = await Post.findById(id);
    if (!isExist) {
      throw createError(404, "No post found with this id");
    }

    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const creator = decodedToken.user._id;
    if (isExist.creator.toString() !== creator) {
      throw createError(
        400,
        "You cannot delete this post because you are not owner of this post."
      );
    }
    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ postId: id });

    return successResponse(res, {
      statusCode: 200,
      message: "Post deleted successfull",
    });
  } catch (error) {
    next(error);
  }
};

const handleAddReactionToPost = async (req, res, next) => {
  try {
    const { postId, react } = req.body;

    if (!postId || !react) {
      throw createError(400, "Post ID and reaction type are required");
    }

    const accessToken = req.cookies.accessToken;
    const decodedToken = jwt.decode(accessToken, jwtAccessTokenSecret);
    const reactorId = decodedToken.user._id;

    let update;
    let options = { new: true, context: query }; // To return the updated document

    const post = await Post.findById(postId);

    if (!post) {
      throw createError(404, "No post found with this ID");
    }

    const existingReactionIndex = post.reactions.findIndex(
      (reaction) => reaction.user.toString() === reactorId
    );

    // If the user has already reacted with the same reaction type, remove the reaction
    if (
      existingReactionIndex !== -1 &&
      post.reactions[existingReactionIndex].react === react
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

    const updatedPost = await Post.findByIdAndUpdate(postId, update, options);

    return successResponse(res, {
      statusCode: 200,
      message: "Reaction updated successfully",
      payload: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreatePost,
  handleGetPostById,
  handleGetPosts,
  handleDeletePost,
  handleEditPost,
  handleAddReactionToPost,
};
