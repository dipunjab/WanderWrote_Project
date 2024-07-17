import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js";
import { deleteFromCloudinary, uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getUserProfile = asyncHandler(async(req,res)=>{
    return res.status(200).render("profile", {user:req.user})
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullname, username, about, country } = req.body;

    // console.log("Current User:", req.user);
    // console.log("Updating user with ID:", req.user._id);
    // console.log("Request body:", req.body);

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User doesn't exist");
    }

    const profilePictureLocalPath = req.file?.path;

    const oldPublicId = user.profilePicture ? user.profilePicture.replace(/.*\//, '').replace(/\..*/, '') : null;
    if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId)
    }

    let profilePicture = user.profilePicture; 
    
    if (profilePictureLocalPath) {
        const uploadResult = await uploadonCloudinary(profilePictureLocalPath);
        if (!uploadResult) {
            throw new ApiError(400, "Profile picture upload failed");
        }
        profilePicture = uploadResult.url;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullname,
                username,
                about,
                country,
                profilePicture,
            },
        },
        { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, updatedUser, "Account details updated successfully."));
});

  export {
    getUserProfile,
    updateUserProfile
  };