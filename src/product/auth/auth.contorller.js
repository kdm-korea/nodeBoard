import authService from './service';

const createAccessToken = async (req, res, next) => {
  const token = req.headers.authorization;

  await authService
    .createAccessToken(token)
    .then((accessToken) => res.json({ accesstoken: accessToken }))
    .catch((error) => next(error));
};

export default { createAccessToken };
