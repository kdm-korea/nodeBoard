import db from '../../../config/mariadb.config';
import crypto from '../../help/crpytoEncoding';
import uuid from '../../help/uuid';
import ErrorMessage from '../../help/exception';

const findUserByHash = async (userHash) => {
  const user = await db.User.findOne({
    raw: true,
    where: { hash: userHash },
  });
  if (user === null) {
    throw new ErrorMessage.Forbioddan('없는 사용자입니다.');
  }
  return user;
};

const findUserByEmail = async (userEmail) => {
  const user = await db.User.findOne({
    raw: true,
    where: { email: userEmail },
  });

  if (user === null) {
    throw new ErrorMessage.Forbioddan('이메일이 일치하는 유저가 없습니다.');
  }
  return user;
};

const chkNotExistEamil = async (inputEmail) => {
  const reduplicate = await db.User.findAndCountAll({
    raw: true,
    where: { email: inputEmail },
  });
  if (reduplicate.count !== 0) {
    throw new ErrorMessage.Forbioddan(
      '이미 계정을 소유하고 있는 이메일입니다.'
    );
  }
  return true;
};

const comparePassword = async (user, password) => {
  const isPassword = await crypto.comparePassword(
    password,
    user.salt,
    user.password
  );
  if (!isPassword) {
    throw new ErrorMessage.Forbioddan('패스워드가 일치하지 않습니다.');
  }
  return true;
};

const createUser = async (data) => {
  const record = data;
  const hashPassword = await crypto.saltHashEncoding(data.password);

  record.hash = uuid.createToken();
  record.password = hashPassword.key;
  record.salt = hashPassword.salt;

  return db.User.create(record);
};

const updateUserInfo = async (user, userDto) => {
  const recordUser = await db.User.update(
    { name: userDto.name, email: userDto.email },
    { where: { hash: user.hash } }
  );
  if (user !== 1) {
    throw new Error('Database Error, user.help.service :: updateUserInfo');
  }
  return true;
};

const updatePw = async (user, newPassword) => {
  const hashPassword = await crypto.saltHashEncoding(newPassword);
  const recordUser = await db.User.update(
    { password: hashPassword.key, salt: hashPassword.salt },
    { where: { hash: user.hash } }
  );
  if (recordUser[0] === 1) {
    throw new Error('Database Error, user.help.service :: updatePw');
  }
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
