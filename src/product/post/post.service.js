import db from '../../config/mariadb.config';

const create = async (post) => {
  return db.Board.create(post).catch((error) => console.log(error));
};

const findOne = async (postId) => {
  return db.Board.findAll({
    where: {
      id: postId,
    },
  }).catch((error) => console.log(error));
};

const save = async (postId, post) => {
  return db.Board.update(
    { title: post.title, contents: post.contents },
    { where: { id: postId } }
  ).catch((error) => console.log(error));
};

const findAll = async () => {
  return db.Board.findAll().catch((error) => console.log(error));
};

const deleteOne = async (postId) => {
  return db.Board.destroy({
    where: {
      id: postId,
    },
  }).catch((error) => console.log(error));
};

export default {
  create,
  save,
  findOne,
  findAll,
  deleteOne,
};
