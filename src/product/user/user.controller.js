import userService from './user.service';

const signUp = async (req, res) => {
  const { body } = req;

  userService
    .execSignUp(body)
    .then((userHash) => res.json({ hash: userHash }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const signIn = (req, res) => {
  const { body } = req;

  userService
    .execSignIn(body)
    .then((token) => res.json({ tokens: token }))
    .catch((error) => res.json({ message: error.message }));
};

const comparePassword = (req, res) => {
  const { body } = req;

  userService
    .execComparePassword(body.id, body.password)
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

const modifyPw = (req, res) => {
  const { body } = req;

  userService
    .execUpdatePw(body)
    .then((result) => res.json({ message: result }))
    .catch((error) => res.json({ message: error.message }));
};

const modifyInfo = async (req, res) => {
  const { body } = req;

  userService
    .execModifiyInfo(body)
    .then(() => res.status(204))
    .catch((error) => res.json({ message: error.message }));
};

const userInfo = (req, res) => {
  const userHash = req.user.hash;
  userService
    .execUserInfo(userHash)
    .then((user) => res.json({ userInfo: user }))
    .catch((error) => res.json({ message: error.message }));
};

const deleteUser = (req, res) => {
  const { password } = req.body;
  const userHash = req.user.hash;

  userService
    .execDeleteUser(userHash, password)
    .then(() => res.status(204))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  signUp,
  signIn,
  signOut,
  userInfo,
  modifyPw,
  modifyInfo,
  deleteUser,
  comparePassword,
};
