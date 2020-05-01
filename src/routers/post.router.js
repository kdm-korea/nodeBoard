import express from 'express';
import postController from '../controller/post.controller';

const router = express.Router();

const routerLog = (res, req, next) => {
  console.log('=============================================');
  console.log(':::::::::: LEVEL_1 DEBUG LOG :::::::::: Route');
  next();
};

router.get('/:id', routerLog, postController.findOne);

router.post('/', routerLog, postController.savePost);

router.put('/:id');

router.delete('/:id');

module.exports = router;
