import jwt from "jsonwebtoken";

const createToken = (data, time, key) => {
  return jwt.sign(data, key, {
    expiresIn: time,
  });
};

const createRefreshToken = async (user) => {
  const data = {
    hash: user.hash,
  };
  return createToken(data, "7d", process.env.REFRESH_JWT_KEY);
};

const createAccessToken = (user) => {
  const data = {
    hash: user.hash,
    permission: user.permission,
    name: user.name,
    email: user.email,
  };
  return createToken(data, "30m", process.env.ACCESS_JWT_KEY);
};

const createTokens = async (user) => {
  const [refreshToken, accessToken] = await Promise.all([
    createRefreshToken(user),
    createAccessToken(user),
  ]);

  return { refreshToken, accessToken };
};

export default {
  createTokens,
  createAccessToken,
};
