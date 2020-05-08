import express from 'express';
import jwt from '../../middleware/jwt.auth';
import userController from './user.controller';

const router = express.Router();
/*
// signUp,
//   signIn,
  userInfo,
  modifyInfo,
  deleteUser

  // signOut,
  findPw,
  modifyPw,
  
*/
router.get('/', userController.userInfo);

router.get('/signout', userController.signOut);

router.post('/signin', userController.signIn, jwt.createToken);

router.post('/signup', userController.signUp, jwt.createToken);

router.put('/', userController.modifyInfo);

router.delete('/', userController.deleteUser);

module.exports = router;
