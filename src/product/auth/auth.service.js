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

const createAccessToken = async (user) => {
  const data = {
    id: user.id,
    permission: user.permission,
    name: user.name,
    email: user.email,
  };
  return createToken(data, '30m');
};

const createTokens = async (user) => {
  return {
    refreshToken: await createRefreshToken(user),
    accessToken: await createAccessToken(user),
  };
};

export default {
  createTokens,
  createAccessToken,
};
