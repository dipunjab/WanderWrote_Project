import { Router } from "express";
import { getAllposts } from "../controllers/home.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT);


router.route("/").get(getAllposts)


export default router