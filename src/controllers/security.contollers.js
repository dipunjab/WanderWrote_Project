import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Post} from "../models/post.models.js"
import { Like } from "../models/like.models.js"
import { Comment } from "../models/comment.models.js"

const getSecurity = asyncHandler(async(req,res)=>{
    return res.status(200).render("security", {user:req.user})
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body
    
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Changed successfully"))
});

const deleteUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const posts = await Post.find({ owner: userId });

    // Delete all comments and likes for the posts
    await Promise.all([
      Comment.deleteMany({ owner: userId }),
      Like.deleteMany({ owner: userId }),
      Post.deleteMany({ owner: userId }),
    ]);

    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await User.findByIdAndDelete(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User profile deleted successfully"));
});


export {
    getSecurity,
    changeCurrentPassword,
    deleteUserProfile
}