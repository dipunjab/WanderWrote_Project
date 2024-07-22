import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.models.js";
import { Like } from "../models/like.models.js"
import { Comment } from "../models/comment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadonCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js";

const getcreateAPost = asyncHandler(async(req,res)=>{
    return res.status(200).render("createpost", {user: req.user})
});
const createAPost = asyncHandler(async(req,res)=>{
    const { content} = req.body
    // TODO: get video, upload to cloudinary, create video
    if (!content) {
        throw new ApiError(400, `All fields are compulsory`)
    }

    const picture = req.files?.picture[0]?.path
    if (!picture) {
        throw new ApiError(400, "picture is required 1")
    };
    
    const pictureUpload = await uploadonCloudinary(picture)
    if (!pictureUpload) {
        throw new ApiError(400, "video is required")
    };    
    console.log(pictureUpload.url, "picture uploaded");
    

    const post = await Post.create({
        content,
        picture: pictureUpload.url,
        owner: req.user._id,
        isPublished: true
    })

    return res.json(
        new ApiResponse(200, post, "post created successfully")
    )    
});

const getuserposts = asyncHandler(async(req,res)=>{
    const posts = await Post.find({ owner: req.user._id }).sort({ createdAt: -1 });

    const userId = req.user ? req.user._id : null;

    for (const post of posts) {
        const totalLikes = await Like.countDocuments({ post: post._id });
        const likedByUser = userId ? await Like.exists({ post: post._id, likedBy: userId }) : false;
        post.totalLikes = totalLikes;
        post.likedByUser = !!likedByUser;

        const totalcomments = await Comment.countDocuments({ post: post._id });
        const commentByUser = userId ? await Comment.exists({ post: post._id, commentby: userId }) : false;
        post.totalcomments = totalcomments;
        post.commentByUser = !!commentByUser;
    }
    return res.status(200).render("userposts", { user: req.user, posts });
});

const deleteapost = asyncHandler(async(req,res)=>{
    const { postId } = req.params
    if (!isValidObjectId(postId)) {
        throw new ApiError(400,"Id of post is missing")
    }
    const post =await Post.findById(postId)

    if (post.owner.toString() !== req.user.id) {
        throw new ApiError(400, "You cannot delete this video.")
    }

        if (post.picture) {
            const publicId =  post.picture ? post.picture.replace(/.*\//, '').replace(/\..*/, '') : null;
            const result = await deleteFromCloudinary(publicId);
            if (!result || result.result !== 'ok') {
                throw new ApiError(500, "Error deleting picture from Cloudinary");
            }
        }

    const deletepost = await Post.deleteOne({_id: postId})

    return res.json(new ApiResponse(200,deletepost,"post has been Delete frome database"))
});

export {getcreateAPost,
    createAPost,
    getuserposts,
    deleteapost
}
