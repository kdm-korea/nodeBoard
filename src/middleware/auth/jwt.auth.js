import jwt from 'jsonwebtoken';
import ErrorMessage from '../../product/help/exception';

const verification = async (req, res, next) => {
  const token = await req.headers.authorization;

  if (token === undefined) {
    next(new ErrorMessage.UndefinedToken());
  }

  jwt.verify(
    token.split('Bearer ')[1],
    process.env.ACCESS_JWT_KEY,
    (err, payload) => {
      if (!err) {
        req.user = payload;
        next();
      } else {
        next(new ErrorMessage.ExpiredToken());
      }
    }
  );
};

export default {
  verification,
};
