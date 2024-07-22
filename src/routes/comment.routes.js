import { Router } from "express";
import { addComment, getpostComments } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT);


router.route("/:postId").post(addComment).get(getpostComments)


export default router