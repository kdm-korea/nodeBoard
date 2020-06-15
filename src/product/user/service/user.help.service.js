import db from '../../../config/mariadb.config';
import crypto from '../../help/crpytoEncoding';
import uuid from '../../help/uuid';
import ErrorMessage from '../../help/exception';

const findUserByHash = async (userHash) => {
  return db.User.findOne({
    raw: true,
    where: { hash: userHash },
  }).then((user) => {
    if (user !== null) {
      return user;
    }
    throw new ErrorMessage.Forbioddan('없는 사용자입니다.');
  });
};

const findUserByEmail = (userEmail) => {
  return db.User.findOne({
    raw: true,
    where: { email: userEmail },
  }).then((user) => {
    if (user !== null) {
      return user;
    }
    throw new ErrorMessage.Forbioddan('이메일이 일치하는 유저가 없습니다.');
  });
};

const chkNotExistEamil = (inputEmail) => {
  return db.User.findAndCountAll({
    raw: true,
    where: { email: inputEmail },
  }).then((reduplicate) => {
    if (reduplicate.count === 0) {
      return true;
    }
    throw new ErrorMessage.Forbioddan(
      '이미 계정을 소유하고 있는 이메일입니다.'
    );
  });
};

const comparePassword = async (user, password) => {
  if (await crypto.comparePassword(password, user.salt, user.password)) {
    return true;
  }
  throw new ErrorMessage.Forbioddan('패스워드가 일치하지 않습니다.');
};

const createUser = async (data) => {
  const record = data;
  const hashPassword = await crypto.saltHashEncoding(data.password);

  record.hash = await uuid.createToken();
  record.password = hashPassword.key;
  record.salt = hashPassword.salt;
  return db.User.create(record);
};

const updateUserInfo = async (user, userDto) => {
  const authUser = await db.User.update(
    { name: userDto.name, email: userDto.email },
    { where: { hash: user.hash } }
  ).then((result) => {
    if (result === 1) {
      return true;
    }
    throw new Error('Database Error, user.help.service :: updateUserInfo');
  });
};

const updatePw = async (user, newPassword) => {
  const hashPassword = await crypto.saltHashEncoding(newPassword);

  return await db.User.update(
    { password: hashPassword.key, salt: hashPassword.salt },
    { where: { hash: user.hash } }
  ).then((changeRecord) => {
    if (changeRecord[0] === 1) {
      return true;
    }
    throw new Error('Database Error, user.help.service :: updatePw');
  });
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
