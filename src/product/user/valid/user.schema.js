import { check, validationResult, body, header } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(
      validations.map(async (validation) => {
        const a = await validation.run(req);
        console.log(a.fields[0]);
      })
    );

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

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

const name = body('name').notEmpty().withMessage('이름은 필수 입력사항입니다.');

export default {
  signUpSchema: validate([name, email, password]),
};
