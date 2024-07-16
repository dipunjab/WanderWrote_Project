import { Router } from "express";
import { gethomepage } from "../controllers/home.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
router.use(verifyJWT);


router.route("/").get(gethomepage)


export default router