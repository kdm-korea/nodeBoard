import jwt from 'jsonwebtoken';

const createToken = async (req, res, next) => {
  console.log(req.body);
  console.log(res.body);
  jwt.sign(
    {
      id: res.id,
    },
    process.env.JWT_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '30m',
    },
    (token) => {
      res.json(token);
      next();
    }
  );
};

const tokenVerification = (req, res, next) => {
  const token = req.get('accessToken');

  jwt
    .verify(token, process.env.JWT_KEY)
    .then((data) => {
      req.id = data;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(403);
    });
};

const isExpired = () => {};

export default {
  createToken,
  tokenVerification,
  isExpired,
};
