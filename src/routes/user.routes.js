import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js"
import { registerUser ,
         getregisterUser,
         getloginUserPage
        } from "../controllers/user.controllers.js"

const router = Router()

router.route("/signup").get(getregisterUser)
router.route("/signup").post(
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerUser
)    

router.route("/login").get(getloginUserPage)

export default router