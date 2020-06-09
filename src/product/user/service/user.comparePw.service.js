import userHelp from './user.help.service';

const execIsCorrectPassword = async (hash, password) => {
  return userHelp
    .findUserByHash(hash)
    .then((user) => userHelp.comparePassword(user, password));
};

export default execIsCorrectPassword;
