import { Router } from "express";
import {
  postPost,
  patchPost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controllers/postController.js";
import { requireAuth } from "../middlewares/authJWT.js";

const postRouter = Router();

postRouter.route("/").post(requireAuth, postPost).get(getAllPosts);
postRouter
  .route("/:id")
  .patch(requireAuth, patchPost)
  .delete(requireAuth, deletePost)
  .get(getPost);

export { postRouter };
