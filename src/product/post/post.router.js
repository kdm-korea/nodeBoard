import express from 'express';
import postController from './post.controller';
import valid from './valid/post.valid';

const router = express.Router();

router.get('/', postController.findAll);

router.get('/:id', valid.paramsIdValid, postController.findOne);

router.post('/', postController.savePost);

router.put('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
