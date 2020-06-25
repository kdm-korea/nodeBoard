import authService from './service';

const createAccessToken = async (req, res, next) => {
  const token = req.headers.authorization;

  return authService
    .createAccessToken(token)
    .then((accessToken) => res.json({ accessToken: accessToken }))
    .catch((error) => next(error));
};

export default { createAccessToken };
