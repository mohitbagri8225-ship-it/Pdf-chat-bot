import { Router } from "express";
import {logOutUser,regesterUser,loginUser} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/verifyjwt.middleware.js";

const router = Router();


 router.route("/register").post(regesterUser);

router.route("/login").post(
    loginUser
)

//secured routes
router.route("/logout").post(
    //sequence of middlewares is important here as we need to verify the user first before logging out the user
    verifyJwt,
    logOutUser
)


export default router;

