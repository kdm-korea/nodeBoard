import userHelp from "./user.help.service";

const execUpdatePw = async (hash, userDto) => {
  const user = await userHelp.findUserByHash(hash);
  await userHelp.comparePassword(user, userDto.password);
  return userHelp.updatePw(user, userDto.newPassword);
};

export default execUpdatePw;
