import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import {Post} from "../models/post.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const togglePostLike = asyncHandler(async (req, res) => {
    const {postId} = req.params

    if (!isValidObjectId(postId)) {
        throw new ApiError(400,"Invalid video id")
    }
    if (!req.user?._id) throw new ApiError(404, "unauthorized User id")

    const post = await Post.findById(postId)
    if (!post) {
        throw new ApiError(404,"Video not found")
    }


    const islikeby = await Like.findOne({
        post: postId,
        likedBy: req.user._id
    }) 
    let status;

    if (!islikeby) {
        await Like.create({
            post: postId,
            likedBy: req.user._id
        })
        status= {islikeby: true}
    }else{
        await Like.findByIdAndDelete(islikeby._id)
        status= {islikeby: false}
    }

    const totalLikes = await Like.countDocuments({ post: postId});
    status.totalLikes = totalLikes

    return res.json(new ApiResponse(200, status, "like toggeled successfully"))
});

export {togglePostLike}