import { check, validationResult, param, header } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

// const jwt = header('authorization')
//   .not()
//   .isEmpty()
//   .withMessage('토큰이 없습니다.');

const id = param('id').isNumeric().withMessage('숫자로만 이루어져야 합니다.');

const title = check('title')
  .not()
  .isEmpty()
  .withMessage('제목은 필수 입력사항입니다.');

const contents = check('contents')
  .not()
  .isEmpty()
  .withMessage('내용은 필수 입력사항입니다.');

const password = check('password')
  .not()
  .isEmpty()
  .withMessage('비밀번호는 필수 입력사항입니다.');

export default {
  getOneSchema: validate([id]),
  updateSchema: validate([id, contents, title]),
  postSchema: validate([title, contents]),
  deleteSchema: validate([password, id]),
};
