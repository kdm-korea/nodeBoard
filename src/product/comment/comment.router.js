import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import commentController from './comment.controller';

const router = express.Router();

router.get(
  '/post/:postId/comment/page/:pageId',
  commentController.getCommentPage
);

router.post(
  '/post/:postId/comment',
  jwt.verification,
  commentController.createComment
);

router.patch(
  '/post/:postId/comment/:commentId',
  jwt.verification,
  commentController.updateComment
);

router.delete('/comment/:commentId', jwt.verification);

module.exports = router;
