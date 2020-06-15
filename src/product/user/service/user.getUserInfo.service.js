import db from '../../../config/mariadb.config';
import ErrorMessage from '../../help/exception';

const execUserInfo = async (userHash) => {
  return db.User.findOne({
    attributes: ['name', 'email', 'permission'],
    where: {
      hash: userHash,
    },
  }).then((user) => {
    if (user === null) {
      throw Error('Database Error ::: user.getUserInfo.service');
    }
    return user;
  });
};

export default execUserInfo;
