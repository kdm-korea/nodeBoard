import jwt from 'jsonwebtoken';

const verification = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error('Not Found Token');
  }

  jwt.verify(token.split('Bearer ')[1], process.env.JWT_KEY, (err, payload) => {
    console.log(payload);
    if (err) {
      res.status(401).json({ success: false, message: err.message });
    } else {
      req.user = payload;
      next();
    }
  });
};

export default {
  verification,
};
