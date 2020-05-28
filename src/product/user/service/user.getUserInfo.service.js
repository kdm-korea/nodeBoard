import db from '../../../config/mariadb.config';

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

export default execUserInfo;
