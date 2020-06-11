import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import commentController from './comment.controller';

const router = express.Router();

//base router = post/:postId
router.get(
  '/post/:postId/comment/page/:pageId',
  commentController.getCommentPage
);

router.post(
  '/post/:postId/comment',
  jwt.verification,
  commentController.createComment
);

router.patch('/comment/:commentId', jwt.verification);

router.delete('/comment/:commentId', jwt.verification);

module.exports = router;
