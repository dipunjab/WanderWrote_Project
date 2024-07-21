import { Router } from "express";
import { createAPost, deleteapost, getcreateAPost, getuserposts } from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js"

const router = Router()
router.use(verifyJWT);

router.route("/createposts").get(getcreateAPost)
                           .post(upload.fields([
                            {
                                name: "picture",
                                maxCount: 1,
                            }
                        ]),createAPost)
router.route("/userposts").get(getuserposts)
router.route("/delete-post/:postId").get(deleteapost).delete(deleteapost)


export default router