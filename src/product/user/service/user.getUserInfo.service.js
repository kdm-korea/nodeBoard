import db from '../../../config/mariadb.config';
import ErrorMessage from '../../help/exception';

const execUserInfo = async (userHash) => {
  const user = await db.User.findOne({
    attributes: ['name', 'email', 'permission'],
    where: {
      hash: userHash,
    },
  });
  if (user === null) {
    throw Error('Database Error ::: user.getUserInfo.service');
  }
  return user;
};

export default execUserInfo;
