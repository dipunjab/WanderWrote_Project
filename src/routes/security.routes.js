import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getSecurity, changeCurrentPassword } from "../controllers/security.contollers.js";

const router = Router()
router.use(verifyJWT);


router.route("/security").get(getSecurity)
router.route("/security").post(changeCurrentPassword)



export default router