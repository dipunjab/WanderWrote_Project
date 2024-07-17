import { asyncHandler } from "../utils/asyncHandler.js"

const gethomepage = asyncHandler(async(req,res)=>{
    return res.status(200).render("home",{ user: req.user })
 });

 export {
    gethomepage
 }