import userService from './user.service';
import jwt from '../auth/jwt.token';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .checkEamil(body.email)
    .then((answer) => {
      if (!answer) {
        res.json({ emailOverlap: !answer });
      } else {
        userService
          .createUser(body)
          .then((user) => jwt.createTokens(user))
          .then((token) => res.json(token));
      }
    })
    .catch((err) => {
      console.log(':::: USER CONTROLLER ERROR ===========');
      res.json({ message: err.message });
    });
};

      res.json(err);
    });
};

export default {
  signUp,
};
