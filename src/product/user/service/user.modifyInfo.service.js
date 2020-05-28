import userHelp from './user.help.service';

const execModifiyInfo = async (userDto) => {
  const user = userHelp.findUserByHash(userDto.user.hash);

  return userHelp
    .comparePassword(user, userDto.password)
    .then(() => userHelp.updateUserInfo(user, userDto));
};

export default execModifiyInfo;
