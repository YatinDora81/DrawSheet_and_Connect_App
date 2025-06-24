import express, { Router } from "express"
import { get_all_avatars, get_single_avatar, isAuthenticatedUser } from "../middleware/isAuth.js"
import { signinController, signoutController, signupController, userDetailController } from "../controllers/authControllers.js"


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

export default router;