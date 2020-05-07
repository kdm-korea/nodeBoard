import express from 'express';
import postController from './post.controller';

const router = express.Router();

router.get('/', postController.findAll);

router.get('/:id', postController.findOne);

router.post('/', postController.savePost);

router.put('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
