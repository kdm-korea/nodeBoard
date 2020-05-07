import express from 'express';
import jwt from '../middleware/jwt.auth';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body } = req;

  console.log(JSON.stringify(await jwt.createToken(body)));
  res.send('User Post');
  next();
});

// router.get('/', (req, res, next) => {
//   console.log('router get');
// });

module.exports = router;
