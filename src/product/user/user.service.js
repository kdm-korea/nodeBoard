import db from '../../config/mariadb.config';
import crypto from '../../lib/pwEnoding/crpytoEncoding';

const findUserById = async (userId) => {
  return db.User.findOne({
    raw: true,
    where: {
      id: userId,
    },
  }).catch(() => {
    throw new Error(`없는 일련번호입니다.`);
  });
};

const findUserByEmail = async (userEmail) => {
  return db.User.findOne({
    raw: true,
    where: {
      email: userEmail,
    },
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
    where: {
      email: inputEmail,
    },
  }).then((reduplicate) => {
    if (reduplicate.count === 0) {
      return true;
    }
    throw new Error('Already have same email');
  });
};

const comparePassword = async (user, password) => {
  if (await crypto.comparePassword(password, user.salt, user.password)) {
    return user;
  }
  throw new Error('No Match Password');
};

const createUser = async (data) => {
  const record = data;
  const hashPassword = await crypto.saltHashEncoding(data.password);

  record.password = hashPassword.key;
  record.salt = hashPassword.salt;

  return db.User.create(record);
};

const execSignIn = async (body) => {
  return findUserByEmail(body.email)
    .then((user) => comparePassword(user, body.password))
    .then((user) => authService.createTokens(user))
    .then((token) => token);
};
export default {
  findUserById,
  findUserByEmail,
  comparePassword,
  chkNotExistEamil,
  createUser,
};
