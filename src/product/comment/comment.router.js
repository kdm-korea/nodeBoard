import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import commentSchema from './valid/comment.schema';
import commentController from './comment.controller';

const router = express.Router();

router.get(
  '/post/:postId/comment/page/:pageId',
  commentSchema.getCommentPage,
  commentController.getCommentPage
);

router.post(
  '/post/:postId/comment',
  jwt.verification,
  commentSchema.createComment,
  commentController.createComment
);

router.patch(
  '/post/:postId/comment/:commentId',
  jwt.verification,
  commentSchema.updateComment,
  commentController.updateComment
);

router.delete(
  '/post/:postId/comment/:commentId',
  jwt.verification,
  commentSchema.deleteComment,
  commentController.deleteComment
);

module.exports = router;
