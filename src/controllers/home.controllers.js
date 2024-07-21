import { asyncHandler } from "../utils/asyncHandler.js"
import {Post} from "../models/post.models.js"
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"


 const getAllposts = asyncHandler(async (req, res) => {
   const { page = 1, limit = 10, postsFile} = req.query

   let postsfilter = {};
   if (postsFile) {
      postsfilter = { postsFile: postsFile };
   }

   const posts = await 
                 Post.find(postsfilter)
                 .populate("owner", "fullname country profilePicture")
                 .limit(limit)
                 .skip((page -1)*limit)
                 .sort({createdAt: -1}) 
        return res.status(200).render("home", {user: req.user , posts})
});
 export {
    getAllposts
 }