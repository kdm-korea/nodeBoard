import { check, validationResult, body, header } from 'express-validator';
import validate from '../../help/validChining';

const token = header('authorization')
  .notEmpty()
  .withMessage('토큰이 없습니다.');

const email = body('email')
  .isEmail()
  .not()
  .withMessage('이메일 형식이 아닙니다.')
  .trim()
  .isEmpty()
  .withMessage('이메일은 필수 입력사항입니다.');

const password = body('password')
  .notEmpty()
  .withMessage('비밀번호는 필수 입력사항입니다.');

const newPassword = body('newPassword')
  .notEmpty()
  .withMessage('새로운 비밀번호는 필수 입력사항입니다.');

const name = body('name').notEmpty().withMessage('이름은 필수 입력사항입니다.');

const mustNullPermission = body('permission')
  .isEmpty()
  .withMessage('권한은 입력사항이 아닙니다.');

export default {
  signInSchema: validate([email, password]),
  signUpSchema: validate([name, email, password, mustNullPermission]),
  signOutSchema: validate([token]),
  userInfoSchema: validate([token]),
  modifyPwSchema: validate([token, password, newPassword]),
  modifyInfoSchema: validate([token, email, name, mustNullPermission]),
  DeleteUserSchema: validate([token, password]),
  comparePassword: validate([token, password]),
};
