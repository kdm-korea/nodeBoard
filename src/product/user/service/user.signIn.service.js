import userHelp from './user.help.service';
import authHelp from '../../auth/service/auth.help.service';

const execSignIn = async (userDto) => {
  return userHelp
    .findUserByEmail(userDto.email)
    .then(async (user) => {
      await userHelp.comparePassword(user, userDto.password);
      return authHelp.createTokens(user);
    })
    .then((token) => token);
};

export default execSignIn;
