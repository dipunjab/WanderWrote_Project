import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';


const gethomepage = asyncHandler(async(req,res)=>{
    return res.status(200).render("home")
 });

 export {
    gethomepage
 }