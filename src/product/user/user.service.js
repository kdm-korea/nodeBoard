import db from '../../config/mariadb.config';
import crypto from '../../tool/crpytoEncoding';

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
const compareEamil = async (inputEmail) => {
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

const comparePassword = async (userId, password) => {
  await db.User.findAll({
    where: {
      raw: true,
      id: userId,
    },
  })
    .then((user) => {
      return crypto.comparePassword(password, user.salt, user.password);
    })
    .catch((error) => {
      console.log(error);
      throw new Error({ message: 'no have match user' });
    });
};

const createUser = async (data) => {
  const record = data;
  const hashPassword = await crypto.saltHashEncoding(data.password);

  record.password = hashPassword.key;
  record.salt = hashPassword.salt;

  return db.User.create(record);
};

const compareUser = async (userDto) => {
  return db.User.findOne({
    raw: true,
    where: { email: userDto.email },
  }).then((user) => {
    if (user === null) {
      throw new Error('no have match this email');
    }
    return crypto
      .comparePassword(userDto.password, user.salt, user.password)
      .then((isMatch) => {
        if (isMatch) {
          return user;
        }
        throw new Error('no match this password');
      });
  });
};

export default {
  comparePassword,
  compareEamil,
  createUser,
  compareUser,
};
