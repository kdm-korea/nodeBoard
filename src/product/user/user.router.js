import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import userController from './user.controller';
import userSchema from './valid/user.schema';

const router = express.Router();

router.post('/signin', userController.signIn);

router.post('/signup', userSchema.signUpSchema, userController.signUp);

router.post('/signout', jwt.verification, userController.signOut);

router.delete('/', jwt.verification, userController.deleteUser);

// router.get('/:id', userController.userInfo);

// router.put('/:id', userController.modifyInfo);

// router.put('/id', userController.modifyPw);

module.exports = router;
