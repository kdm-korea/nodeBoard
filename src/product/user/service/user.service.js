import comparePassword from './user.comparePw.service';
import getUserInfo from './user.getUserInfo.service';
import modifyUserInfo from './user.modifyInfo.service';
import modifyPw from './user.modifyPw.service';
import deleteUser from './user.deleteUser.service';
import signIn from './user.signIn.service';
import signUp from './user.signUp.service';
import signOut from './user.signOut.service';

export default {
  comparePassword,
  getUserInfo,
  modifyUserInfo,
  modifyPw,
  deleteUser,
  signIn,
  signUp,
  signOut,
};
