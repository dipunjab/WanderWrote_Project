import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';

const getregisterUser = asyncHandler(async(req,res)=>{
   return res.status(200).render("signup")
});
const registerUser = asyncHandler(async(req,res)=>{

    const { username, email, fullname, about, password, country} = req.body

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, `All fields are compulsory`)
    }

    //check for user if exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, `User with email or username already exists.`)
    };    

    const profilePictureLocalPath = req.files.profilePicture[0]?.path
    console.log(profilePictureLocalPath);

    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile picture is required")
    };

    const profilePicture = await uploadonCloudinary(profilePictureLocalPath)

    if (!profilePicture) {
        throw new ApiError(400, "Profile picture is not uploaded")
    }

    //create user object - create entry in db
    const user = await User.create({
        fullname,
        profilePicture: profilePicture.url,
        email,
        password,
        username: username.toLowerCase(),
        about,
        country,
    })

     // remove password and refresh token field from response
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

const getloginUserPage =  asyncHandler(async(req,res)=>{
    return res.status(200).render("login")
 });

export {
    registerUser,
    getregisterUser,
    getloginUserPage
}