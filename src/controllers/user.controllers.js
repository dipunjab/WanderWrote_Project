import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // console.log("Generated accessToken:", accessToken);
        // console.log("Generated refreshToken:", refreshToken);


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const getregisterUser = asyncHandler(async(req,res)=>{
   return res.status(200).render("signup")
});
const registerUser = asyncHandler(async(req,res)=>{

    const { username, email, fullname, about, password, country} = req.body

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(404).json({message:`All fields are compulsory`})
    }
    if (password.length < 8 ) {
        return res.status(404).json({message:`Password should contain min 8 characters`})
    }    
    //check for user if exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {

        return res.status(404).json({message:`User with email or username already exists`})
        // throw new ApiError(409, `User with email or username already exists.`)
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
const loginUser = asyncHandler(async(req,res)=>{

    const {email,username,password} = req.body

    if (!(email || username)) {
        throw new ApiError(404,"Email or Username is required")
    }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if (!user) {
        throw new ApiError(404,"User doesn't Exit")
    }

   const isPasswordValid =  await user.isPasswordCorrect(password)
   if (!isPasswordValid) {
        throw new ApiError(401,"Password incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUSer = await User.findById(user._id).
          select("-password -refreshToken") 
          
    const options = {
        httpOnly: true,
        secure: true
    }      

    return res.status(200)
              .cookie("accessToken", accessToken,options)
              .cookie("refreshToken", refreshToken,options)
              .json(
                new ApiResponse(200,{user: loggedInUSer,accessToken,refreshToken},"User logged in successfully")
              )  
});

const logoutpage = asyncHandler(async(req,res)=>{
    return res.status(200).render("logout" ,{ user: req.user })
})
const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
        samsite: 'none'
    } 
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {}, "User loggedout successfully"))
}) ;    

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "invalid refresh token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", newrefreshToken)
            .json(
                new ApiResponse(200, { accessToken, refreshToken: newrefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(402, error?.message || "Invalid refresh token")
    }
});


export {
    registerUser,
    getregisterUser,
    getloginUserPage,
    loginUser,
    logoutUser,
    logoutpage
}