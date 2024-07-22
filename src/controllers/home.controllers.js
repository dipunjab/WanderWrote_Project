import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.models.js";
import { Like } from "../models/like.models.js";
import { Comment } from "../models/comment.models.js";

const getAllposts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, postsFile } = req.query;
    const userId = req.user ? req.user._id : null;

    let postsFilter = {};
    if (postsFile) {
        postsFilter = { postsFile: postsFile };
    }

    const posts = await Post.find(postsFilter)
        .populate("owner", "fullname country profilePicture")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .lean();

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

    return res.status(200).render("home", { user: req.user, posts });
});

export { getAllposts };
