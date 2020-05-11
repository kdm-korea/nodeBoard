import jwt from 'jsonwebtoken';

const createToken = async (data, time) => {
  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: time,
  });
};
export default {
  createTokens,
};
