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

const findAll = async () => {
  return db.Board.findAll();
};

const deleteOne = async (postId) => {
  return db.Board.destroy({
    where: {
      id: postId,
    },
  });
};

export default {
  create,
  save,
  findOne,
  findAll,
  deleteOne,
};
