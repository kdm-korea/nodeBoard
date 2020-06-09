import userHelp from './user.help.service';

const execUpdatePw = async (hash, userDto) => {
  await userHelp.findUserByHash(hash).then(async (user) => {
    await userHelp.comparePassword(user, userDto.password);
    return userHelp.updatePw(user, userDto.newPassword);
  });
};

export default execUpdatePw;
