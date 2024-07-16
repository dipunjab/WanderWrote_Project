import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve token from cookies or headers
        const tokenFromCookies = req.cookies?.accessToken;
        const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");
        const token = tokenFromCookies || tokenFromHeader;

        // console.log("Token from cookies:", tokenFromCookies);
        // console.log("Token from header:", tokenFromHeader);
        // console.log("Final token:", token);
        // console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

        // Check if token is not provided
        if (!token) {
            throw new ApiError(402, "Unauthorized request");
        }

        // Ensure token is a string and non-empty
        if (typeof token !== "string" || token.trim() === "") {
            throw new ApiError(400, "Token must be a non-empty string");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by decoded token ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid accessToken");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
