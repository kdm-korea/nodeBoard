import express from 'express';
// import jwt from '../../middleware/auth/jwt.auth';
import userController from './user.controller';
import userSchema from './valid/user.schema';

const router = express.Router();

router.post('/', userSchema.signUpSchema, userController.signUp);

*/
router.get('/', userController.userInfo);

router.get('/signout', userController.signOut);

router.post('/signin', userController.signIn);

router.post('/signup', userController.signUp, jwt.createToken);

router.put('/', userController.modifyInfo);

router.delete('/', userController.deleteUser);

module.exports = router;
