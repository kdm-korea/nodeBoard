import userHelp from './user.help.service';

const execUpdatePw = async (userDto) => {
  await userHelp.findUserByHash(userDto.user.hash).then(async (user) => {
    await userHelp.comparePassword(user, userDto.oldPassword);
    return userHelp.updatePw(user, userDto.newPassword);
  });
};

export default execUpdatePw;
