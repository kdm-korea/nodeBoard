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

export default {
  checkEamil,
};
