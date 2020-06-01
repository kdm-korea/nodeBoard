import db from '../../../config/mariadb.config';
import crypto from '../../../lib/crpytoEncoding';
import uuid from '../../../lib/uuid';
import error from '../../../middleware/error';

const findUserByHash = async (userHash) => {
  return db.User.findOne({
    raw: true,
    where: { hash: userHash },
  }).then((user) => {
    if (user !== null) {
      return user;
    }
    throw new Error(`없는 사용자입니다.`);
  });
};

const findUserByEmail = async (userEmail) => {
  return db.User.findOne({
    raw: true,
    where: { email: userEmail },
  }).then((user) => {
    if (user !== null) {
      return user;
    }
    throw new Error('이메일이 일치하는 유저가 없습니다.');
  });
};

const chkNotExistEamil = async (inputEmail) => {
  return db.User.findAndCountAll({
    raw: true,
    where: { email: inputEmail },
  }).then((reduplicate) => {
    if (reduplicate.count === 0) {
      return true;
    }
    throw new error.ConfictError('이미 계정을 소유하고 있는 이메일입니다.');
  });
};

const comparePassword = async (user, password) => {
  console.log(await crypto.comparePassword(password, user.salt, user.password));
  if (await crypto.comparePassword(password, user.salt, user.password)) {
    return true;
  }
  throw new Error('패스워드가 일치하지 않습니다.');
};

const createUser = async (data) => {
  const record = data;
  const hashPassword = await crypto.saltHashEncoding(data.password);

  record.hash = await uuid.createToken();
  record.password = hashPassword.key;
  record.salt = hashPassword.salt;
  return db.User.create(record);
};

const updateUserInfo = async (user, userdto) => {
  const authUser = await db.User.findOne({
    where: { hash: user.hash },
  });
  authUser.name = userdto.name;
  authUser.email = userdto.email;
  authUser.reload();
  return true;
};

const updatePw = async (user, inputPw) => {
  const authUser = await db.User.findOne({
    where: { hash: user.hash },
  });
  const hashPassword = await crypto.saltHashEncoding(inputPw);

  authUser.password = hashPassword.key;
  authUser.salt = hashPassword.salt;
  authUser.reload();
  return true;
};

export default {
  findUserByHash,
  findUserByEmail,
  chkNotExistEamil,
  comparePassword,
  createUser,
  updateUserInfo,
  updatePw,
};
