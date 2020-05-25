import userService from './user.service';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .execSignUp(body)
    .then((userId) => res.json({ id: userId }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const signIn = (req, res) => {
  const { body } = req;

  userService
    .execSignIn(body)
    .then((token) => res.json({ accessToken: token }))
    .catch((error) => res.json({ message: error.message }));
};

const validPassword = (req, res) => {
  const { body } = req;

  userService
    .findUserById(body.id)
    .then((user) => userService.comparePassword(user, body.password))
    .then(() => res.json({ password: true }))
    .catch((error) => res.json({ message: error.message }));
};

const signOut = (req, res, next) => {
  const { body } = req;

  userService
    .execSignOut(body)
    .then((result) => res.json({ message: result }))
    .catch((error) => res.json({ message: error.message }));
  next();
};

const findPw = (req, res, next) => {
  next();
};

const modifyPw = (req, res, next) => {
  next();
};

const modifyInfo = (req, res, next) => {
  next();
};

const userInfo = (req, res) => {
  const userId = req.user.id;
  userService
    .execUserInfo(userId)
    .then((user) => res.json({ userInfo: user }))
    .catch((error) => res.json({ message: error.message }));
};

const deleteUser = (req, res) => {
  const { password } = req.body;
  const { id } = req.user;

  userService
    .execComparePassword(id, password)
    .then((result) => res.json({ message: result }))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  signUp,
  signIn,
  signOut,
  userInfo,
  findPw,
  modifyPw,
  modifyInfo,
  deleteUser,
  validPassword,
};
