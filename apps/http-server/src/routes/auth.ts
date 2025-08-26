import express, { Router } from "express"
import { get_all_avatars, get_single_avatar, isAuthenticatedUser } from "../middleware/isAuth.js"
import { forgotPassword, signinController, signoutController, signupController, updateAvatar, userDetailController } from "../controllers/authControllers.js"
import { otpLimiter } from "../config/rateLimiter.js"


const router: Router = express.Router()



//@ts-ignore
router.post("/signup", signupController)

//@ts-ignore
router.post("/signin", signinController)

router.get("/signout", isAuthenticatedUser, signoutController)

router.get("/user-details", isAuthenticatedUser, userDetailController)

router.get("/avatars", get_all_avatars)

// @ts-ignore
router.get("/avatars/:id", get_single_avatar)

router.post("/avatars/update"  , isAuthenticatedUser ,updateAvatar)

router.post("/forgot-password" , otpLimiter , forgotPassword)

export default router;