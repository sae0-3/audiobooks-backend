import { Router } from "express";
import { createAccount, getProfile } from "../controllers/index.js";
import passport from "../middlewares/passport.js";

const userRoutes = Router();

userRoutes.get("/profile", passport.authenticate('jwt', { session: false }), getProfile);
userRoutes.post("/register", createAccount);

export default userRoutes;
