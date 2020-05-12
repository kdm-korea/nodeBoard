import express from 'express';
import auth from '../../middleware/auth/jwt.auth';
import valid from './valid/post.schema';
import postController from './post.controller';

const router = express.Router();

router.get('/', postController.findAll);

router.get('/:id', valid.getOneSchema, postController.findOne);

router.post(
  '/',
  // auth.verification,
  valid.postSchema,
  postController.savePost
);

router.put(
  '/:id',
  // auth.verification,
  valid.updateSchema,
  postController.updatePost
);

// TODO: 삭제 시 비밀번호 체크 추가
router.delete(
  '/:id',
  // auth.verification,
  valid.getOneSchema,
  postController.deletePost
);

module.exports = router;
