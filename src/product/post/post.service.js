import db from '../../config/mariadb.config';

const create = async (post) => {
  return db.Board.create(post);
};

const findOne = async (postId) => {
  return db.Board.findAll({
    where: {
      id: postId,
    },
  });
};

const save = async (postId, post) => {
  return db.Board.update(
    { title: post.title, contents: post.contents },
    { where: { id: postId } }
  );
};

const findPagingPosts = async (pageNum, postRange) => {
  const page = postRange * (pageNum - 1);

  return db.Board.findAll({
    offset: page,
    limit: postRange,
    attributes: ['id', 'title', 'createdAt'],
  });
};

};

const deleteOne = async (postId) => {
  return db.Board.destroy({
    where: {
      id: postId,
    },
  });
};

export default {
  findPagingPosts,
  create,
  save,
  findOne,
  findAll,
  deleteOne,
};
