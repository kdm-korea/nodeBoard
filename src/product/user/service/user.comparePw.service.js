import userHelp from "./user.help.service";

const execIsCorrectPassword = async (hash, password) => {
  const user = await userHelp.findUserByHash(hash);
  return userHelp.comparePassword(user, password);
};

export default execIsCorrectPassword;
