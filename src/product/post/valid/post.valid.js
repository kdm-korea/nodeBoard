import { check, validationResult } from 'express-validator';

const paramsIdValid = async (req, res, next) => {
  await check('id').isInt().withMessage('인자는 숫자여야 합니다.').run(req);

  console.log(req);

  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error);
    res.status(402).json({ error: error.array() });
  }
  next();
};

export default {
  paramsIdValid,
};
