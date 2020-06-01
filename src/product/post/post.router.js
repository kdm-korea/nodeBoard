import express from 'express';
import swaggerValidation from 'openapi-validator-middleware';
import auth from '../../middleware/auth/jwt.auth';
import valid from './valid/post.schema';
import postController from './post.controller';

const router = express.Router();

swaggerValidation.init('src/product/post/valid/post.router.yaml');

router.get('/post/page/:id', postController.paging);

router.get(
  '/post/:id',
  // swaggerValidation.validate,
  valid.getOneSchema,
  postController.findOne
);

router.post(
  '/post',
  // swaggerValidation.validate,
  auth.verification,
  valid.postSchema,
  postController.createPost
);

router.patch(
  '/post/:id',
  auth.verification,
  valid.updateSchema,
  postController.updatePost
);

router.delete(
  '/post/:id',
  auth.verification,
  valid.getOneSchema,
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
