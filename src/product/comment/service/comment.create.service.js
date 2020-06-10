import db from '../../../config/mariadb.config';

const createComment = async (hash, dto) => {
  return db.Comment.create({
    contents: dto.contents,
    userHash: hash,
    postId: dto.postId,
  }).then((record) => {
    if (record === null) {
      throw Error('DataBase Error ::: comment.create.Service');
    }
    return;
  });
};

export default createComment;
