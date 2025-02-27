import express, { Router } from "express"
import { isAuthenticatedUser } from "../middleware/isAuth.js"
import { signinController, signoutController, signupController , userDetailController } from "../controllers/authControllers.js"


const router: Router = express.Router()

//@ts-ignore
router.post("/signup", signupController)

//@ts-ignore
router.post("/signin", signinController)

router.get("/signout", isAuthenticatedUser, signoutController)

router.get("/user-details" , isAuthenticatedUser , userDetailController)

export default router;