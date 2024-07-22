import mongoose, { isValidObjectId } from 'mongoose';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from '../models/post.models.js';

const getpostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Post Id is not available");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found with this post Id or Invalid post Id");
    }

    // console.log("PostID",post);

    const pageLimit = parseInt(limit);
    const pageNumber = parseInt(page);
    const skip = (pageNumber - 1) * pageLimit;

    const comments = await Comment.find({ post: postId })
        .skip(skip)
        .limit(pageLimit)
        .populate("owner", "fullname username profilePicture")
        .sort({createdAt: -1})

    // console.log(Comment);
    // console.log(comments);

    const totalComments = await Comment.countDocuments({ post: postId });
    const totalPages = Math.ceil(totalComments / pageLimit);

    return res.status(200).json(
        new ApiResponse(200, { comments, totalComments, totalPages }, "Post all Comments fetched successfully!")
    );
});


const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) throw new ApiError(400, "Invalid post ID");

    const { content } = req.body;
    if (content?.trim() === "") throw new ApiError(400, "Content is required");

    try {
        const newComment = await Comment.create({
            post: postId,
            content,
            owner: req.user._id
        });

        return res.json(new ApiResponse(201, newComment, "Comment added successfully"));
    } catch (error) {
        throw new ApiError(500, "Error adding comment");
    }
});

export {
    addComment,
    getpostComments
};
