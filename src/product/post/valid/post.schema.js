import { param, header, body } from 'express-validator';
import validate from '../../help/validChining';

const token = header('authorization')
  .notEmpty()
  .withMessage('토큰이 없습니다.');

const id = param('postId')
  .isNumeric()
  .withMessage('숫자로만 이루어져야 합니다.');

const pageId = param('pageId')
  .isNumeric()
  .withMessage('숫자로만 이루어져 있어야 합니다.');

const title = body('title')
  .notEmpty()
  .withMessage('제목은 필수 입력사항입니다.');

const contents = body('contents')
  .notEmpty()
  .withMessage('내용은 필수 입력사항입니다.');

const password = body('password')
  .notEmpty()
  .withMessage('비밀번호는 필수 입력사항입니다.');

export default {
  getPageSchema: validate([pageId]),
  getOneSchema: validate([id]),
  postSaveSchema: validate([token, title, contents]),
  postPatchSchema: validate([token, id, contents, title]),
  deleteSchema: validate([token, password, id]),
};
