import db from '../../config/mariadb.config';
import crypto from '../../tool/crpytoEncoding';

const checkEamil = async (inputEmail) => {
  return db.User.findAndCountAll({
    raw: true,
    where: {
      email: inputEmail,
    },
  })
    .then((reduplicate) => reduplicate.count === 0)
    .catch((error) => {
      console.log(`:::: USER SERVICE CHECK_EMAIL ERROR ===========${error}`);
      return error;
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
  chkPassword,
  checkEamil,
  singUp,
};
