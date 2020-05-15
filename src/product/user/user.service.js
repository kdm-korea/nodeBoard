import db from '../../config/mariadb.config';
import crypto from '../../tool/crpytoEncoding';

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

const chkPassword = async (userId, password) => {
  await db.User.findAll({
    where: {
      raw: true,
      id: userId,
    },
  })
    .then((user) => {
      const inputHashPw = crypto.passwordChk(password, user.salt);

      return inputHashPw === user.password;
    })
    .catch((error) => {
      console.log(error);
      throw new Error({ message: error.message });
    });

  // encrypt.hashPassword(password);
};

const singUp = async (data) => {
  return db.User.create(data).catch((error) =>
    console.log(`:::: USER SERVICE SIGN_UP ERROR ===========${error}`)
  );
};
export default {
  compareEamil,
  chkPassword,
  checkEamil,
  singUp,
};
