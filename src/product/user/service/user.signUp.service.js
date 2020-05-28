import userHelp from './user.help.service';

const execSignUp = async (userDto) => {
  return userHelp
    .chkNotExistEamil(userDto.email)
    .then(() => userHelp.createUser(userDto))
    .then((user) => user.hash);
};

export default execSignUp;
