import express from "express";
import auth from "../../middleware/auth/jwt.auth";
import valid from "./valid/post.schema";
import postController from "./post.controller";

const router = express.Router();

router.get("/post/page/:pageId", valid.getPageSchema, postController.paging);

router.get("/post/:postId", valid.getOneSchema, postController.findOne);

router.post(
  "/post",
  auth.verification,
  valid.postSaveSchema,
  postController.createPost
);

router.patch(
  "/post/:postId",
  auth.verification,
  valid.postPatchSchema,
  postController.updatePost
);

router.delete(
  "/post/:postId",
  auth.verification,
  valid.getOneSchema,
  postController.deletePost
);

module.exports = router;
