import { Router } from "express";
import { postBlog } from "../controllers/blogController.js";
import { requireAuth } from "../middlewares/authJWT.js";

const blogRouter = Router();

blogRouter.route("/").post(requireAuth, postBlog);

export { blogRouter };
