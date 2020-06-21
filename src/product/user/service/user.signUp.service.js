import userHelp from "./user.help.service";

const execSignUp = async (userDto) => {
  await userHelp.chkNotExistEamil(userDto.email);
  const { hash } = await userHelp.createUser(userDto);
  return hash;
};

export default execSignUp;
