import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/profile.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js"

const router = Router()
router.use(verifyJWT);


router.route("/profile").get(getUserProfile)
router.route("/profile").post(upload.single("profilePicture"),updateUserProfile)



export default router