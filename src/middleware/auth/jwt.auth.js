import jwt from 'jsonwebtoken';

const verification = async (req, res, next) => {
  const { token } = req.query;

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
    }
    console.log(payload);
    next();
  });
};

export default {
  verification,
};
