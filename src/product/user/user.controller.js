import userService from './user.service';
import jwt from '../auth/jwt.token';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .chkNotExistEamil(body.email)
    .then(() => userService.createUser(body))
    .then((user) => res.json({ id: user.id }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const signIn = (req, res) => {
  const { body } = req;

  userService
    .findUserByEmail(body.email)
    .then((user) => userService.comparePassword(user, body.password))
    .then((user) => jwt.createTokens(user).then((token) => res.json(token)))
    .catch((error) => res.json({ message: error.message }));
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
