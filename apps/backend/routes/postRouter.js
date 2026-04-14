import { Router } from "express";
import { postPost, patchPost } from "../controllers/postController.js";
import { requireAuth } from "../middlewares/authJWT.js";

const postRouter = Router();

postRouter.route("/").post(requireAuth, postPost);
postRouter.route("/:id").patch(requireAuth, patchPost);

export { postRouter };
