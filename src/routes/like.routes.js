import { Router } from "express";
import { togglePostLike } from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT);


router.route("/:postId").post(togglePostLike)


export default router