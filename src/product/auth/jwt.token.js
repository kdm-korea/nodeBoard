import jwt from 'jsonwebtoken';

const createToken = async (data, time) => {
  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: time,
  });
};

const createRefreshToken = async (user) => {
  const data = {
    id: user.id,
  };
  return createToken(data, '7d');
};

export default {
  createTokens,
  createAccessToken,
};
