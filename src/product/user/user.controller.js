import userService from './user.service';
import jwt from '../auth/jwt.token';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .compareEamil(body.email)
    .then(() => userService.createUser(body))
          .then((user) => jwt.createTokens(user))
    .then((token) => res.json(token))

    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

const signIn = (req, res) => {
  userService
    .compareUser(req.body)
    .then((user) => {
      console.log(user);
      if (!user) {
        res.json({ message: user });
      } else {
        jwt.createTokens(user).then((token) => res.json(token));
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

      res.json(err);

const validPassword = (req, res) => {
  const { body } = req;

  userService
    .comparePassword(body.id, body.password)
    .then((result) => res.json({ password: result }))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  signUp,
  signIn,
  deleteUser,
  validPassword,
};
