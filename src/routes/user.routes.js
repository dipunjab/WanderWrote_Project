import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js"
import { registerUser ,
         getregisterUser,
         getloginUserPage,
         loginUser,
         logoutUser,
         logoutpage
        } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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

router.route("/login").get(getloginUserPage).post(loginUser)

//securedroutes
router.route("/logout").post(verifyJWT,logoutUser).get(verifyJWT,logoutpage)

export default router