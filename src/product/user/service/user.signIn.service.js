import userHelp from "./user.help.service";
import authHelp from "../../auth/service/auth.help.service";

const execSignIn = async (userDto) => {
  const user = await userHelp.findUserByEmail(userDto.email);
  await userHelp.comparePassword(user, userDto.password);
  return authHelp.createTokens(user);
};

export default execSignIn;
