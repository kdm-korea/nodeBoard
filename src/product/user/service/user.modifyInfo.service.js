import userHelp from "./user.help.service";

const execModifiyInfo = async (userDto) => {
  const user = await userHelp.findUserByHash(userDto.user.hash);
  await userHelp.comparePassword(user, userDto.password);
  return userHelp.updateUserInfo(user, userDto);
};

export default execModifiyInfo;
