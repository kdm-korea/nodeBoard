import express from 'express';
import jwt from '../../middleware/auth/jwt.auth';
import userController from './user.controller';
import userSchema from './valid/user.schema';

const router = express.Router();

router.post('/signin', userSchema.signInSchema, userController.signIn);

router.post('/signup', userSchema.signUpSchema, userController.signUp);

router.post(
  '/signout',
  userSchema.signOutSchema,
  jwt.verification,
  userController.signOut
);

router.get(
  '/user',
  userSchema.userInfoSchema,
  jwt.verification,
  userController.userInfo
);

router.delete(
  '/user',
  userSchema.DeleteUserSchema,
  jwt.verification,
  userController.deleteUser
);

router.patch(
  '/user',
  userSchema.modifyInfoSchema,
  jwt.verification,
  userController.modifyInfo
);

router.patch(
  '/user/pw',
  userSchema.modifyPwSchema,
  jwt.verification,
  userController.modifyPw
);

router.post(
  '/user/pw',
  userSchema.comparePassword,
  jwt.verification,
  userController.comparePassword
);

// 이메일로 인증번호 받기, 이메일 인증번호 확인

// 비밀번호 확인

module.exports = router;
