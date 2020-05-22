import express from 'express';
import swaggerValidation from 'openapi-validator-middleware';
import auth from '../../middleware/auth/jwt.auth';
import valid from './valid/post.schema';
import postController from './post.controller';
import userController from '../user/user.controller';

const router = express.Router();

swaggerValidation.init('src/product/post/valid/post.router.yaml');

router.get('/', postController.findAll);

router.get(
  '/:id',
  // swaggerValidation.validate,
  valid.getOneSchema,
  postController.findOne
);

router.post(
  '/',
  // swaggerValidation.validate,
  auth.verification,
  valid.postSchema,
  postController.savePost
);

router.patch(
  '/:id',
  auth.verification,
  valid.updateSchema,
  postController.updatePost
);

// TODO: 삭제 시 비밀번호 체크 추가
router.delete(
  '/:id',
  auth.verification,
  valid.getOneSchema,
  userController.validPassword,
  postController.deletePost
);

router.use((err, req, res, next) => {
  if (err instanceof swaggerValidation.InputValidationError) {
    res.status(400).json(err.errors);
  } else {
    next();
  }
});

module.exports = router;
