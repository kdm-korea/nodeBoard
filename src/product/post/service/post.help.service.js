import db from '../../../config/mariadb.config';

const findOneById = async (postId) => {
  return db.Board.findOne({
    include: [{ model: db.User }],
    where: { id: postId },
  }).then((record) => {
    if (record === null) {
      throw new Error('존재하지 않는 게시물입니다.');
    }
    return record;
  });
};

export default { findOneById };
