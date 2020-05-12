import { check, validationResult } from 'express-validator';

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

const email = check('email')
  .isEmail()
  .not()
  .withMessage('이메일 형식이 아닙니다.')
  .trim()
  .isEmpty()
  .withMessage('이메일은 필수 입력사항입니다.');

const password = check('password')
  .notEmpty()
  .withMessage('비밀번호는 필수 입력사항입니다.');

export default {
  signUpSchema: validate([email, password]),
};
