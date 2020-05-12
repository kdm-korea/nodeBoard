import userService from './user.service';
import jwt from '../auth/jwt.token';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .checkEamil(body.email)
    .then((answer) => {
      if (answer === false) {
        res.json({ emailOverlap: answer });
        throw new Error({ emailOverlap: answer });
      }
    })
    .then(() => userService.singUp(body))
    .then((user) => jwt.createTokens(user))
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      console.log(':::: USER CONTROLLER ERROR ===========');
      res.json(err);
    });
};

export default {
  signUp,
};
