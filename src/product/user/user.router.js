import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import userController from './user.controller';
import userSchema from './valid/user.schema';

const router = express.Router();

router.post('/signin', userController.signIn);

router.post('/signup', userSchema.signUpSchema, userController.signUp);

router.post('/signout', jwt.verification, userController.signOut);

router.get('/user', jwt.verification, userController.userInfo);

router.delete('/user', jwt.verification, userController.deleteUser);

router.patch('/user', userController.modifyInfo);

// router.patch('/user/pw', userController.modifyPw);

router.post('/user/pw', jwt.verification, userController.comparePassword);

// 이메일로 인증번호 받기

// 이메일 인증번호 확인

// 비밀번호 확인

module.exports = router;
