import db from '../../config/mariadb.config';
import crypto from '../../lib/pwEnoding/crpytoEncoding';
import authService from '../auth/auth.service';
import uuid from '../../lib/uuid';

const findUserByHash = async (userHash) => {
  return db.User.findOne({
    raw: true,
    where: { hash: userHash },
  }).then((user) => {
    if (user !== null) {
      return user;
    }
    throw new Error(`없는 일련번호입니다.`);
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
    throw new Error('이미 계정을 소유하고 있는 이메일입니다.');
  });
};

const comparePassword = async (user, password) => {
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

const execComparePassword = async (hash, password) => {
  findUserByHash(hash).then((user) => comparePassword(user, password));
};

const execUpdatePw = async (userDto) => {
  await findUserByHash(userDto.user.hash).then(async (user) => {
    await comparePassword(user, userDto.oldPassword);
    return updatePw(user, userDto.newPassword);
  });
};

const execSignUp = async (userDto) => {
  return chkNotExistEamil(userDto.email)
    .then(() => createUser(userDto))
    .then((user) => user.hash);
};

const execSignIn = async (userDto) => {
  return findUserByEmail(userDto.email)
    .then(async (user) => {
      await comparePassword(user, userDto.password);
      return authService.createTokens(user);
    })
    .then((token) => token);
};

const execSignOut = async (userDto) => {
  // redis에 accessToken을 저장하여 접근을 제한한다.
  // 토큰을 어떻게 처리할지에 대해 고민해봐야 함
};

const execUserInfo = async (userHash) => {
  return db.User.findOne({
    attributes: ['name', 'email', 'permission'],
    where: {
      hash: userHash,
    },
  }).then((user) => {
    if (user === null) {
      throw new Error('없는 유저입니다.');
    }
    return user;
  });
};

const execModifiyInfo = async (userDto) => {
  const user = findUserByHash(userDto.user.hash);

  return comparePassword(user, userDto.password).then(() =>
    updateUserInfo(user, userDto)
  );
};

const execDeleteUser = async (userHash, password) => {
  return 0;
  // 토큰을 어떻게 처리할지에 대해 고민해봐야 함
};

export default {
  execUserInfo,
  execModifiyInfo,
  execComparePassword,
  execSignUp,
  execSignIn,
  execSignOut,
  execDeleteUser,
  execUpdatePw,
  findUserByHash,
  findUserByEmail,
  comparePassword,
  chkNotExistEamil,
};
