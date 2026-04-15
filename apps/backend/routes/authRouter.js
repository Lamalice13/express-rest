import { Router } from "express";
import { signToken } from "../lib/jwt.js";
import passport from "passport";
import { register } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message });

    const token = signToken(user.id);

    return res.json({ token });
  })(req, res, next);
});

authRouter.post("/register", register);

export { authRouter };
