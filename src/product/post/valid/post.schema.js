import { check, validationResult } from 'express-validator';
// import { validations } from 'express-validator';

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

const id = check('id')
  .isNumeric()
  .not()
  .withMessage('숫자로만 이루어져야 합니다.');

const title = check('title')
  .isNumeric()
  .not()
  .withMessage('제목은 필수 입력사항입니다.');

const contents = check('contents')
  .isNumeric()
  .not()
  .withMessage('내용은 필수 입력사항입니다.');

export default {
  getOneSchema: validate([id]),
  updateSchema: validate([title, contents]),
  postSchema: validate([id, title, contents]),
  // deleteSchema: validate([password, id]);
};
