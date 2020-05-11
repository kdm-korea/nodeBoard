import jwt from 'jsonwebtoken';

/*
  1. token create
  2. token chk effectiveness
  3. token period
  */
const verification = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.JWT_KEY);
  next();
};

export default {
  verification,
};
