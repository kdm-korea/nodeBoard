import validate from '../../help/validChining';
import { header } from 'express-validator';

const token = header('authorization')
  .notEmpty()
  .withMessage('토큰이 없습니다.');

export default {
  createAccessToken: validate([token]),
};
