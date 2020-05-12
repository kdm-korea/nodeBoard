import db from '../../config/mariadb.config';

const checkEamil = async (compareEmail) => {
  return db.User.findAndCountAll({
    where: {
      email: compareEmail,
    },
  })
    .then((reduplicate) => reduplicate.count === 0)
    .catch((error) => {
      console.log(`:::: USER SERVICE CHECK_EMAIL ERROR ===========${error}`);
    });
};

const singUp = async (data) => {
  return db.User.create(data).catch((error) =>
    console.log(`:::: USER SERVICE SIGN_UP ERROR ===========${error}`)
  );
};
export default {
  checkEamil,
  singUp,
};
