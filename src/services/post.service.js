import db from '../config/mariadb.config';

const serviceLog = () =>
  console.log(':::::::::: LEVEL_3 DEBUG LOG :::::::::: Service');

const findOne = async (postId) => {
  return db.Board.findAll({
    where: {
      id: postId,
    },
  })
    .then((data) => {
      serviceLog();
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const findAll = async () => {
  return db.Board.findAll()
    .then((result) => {
      serviceLog();
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const create = async (postJson) => {
  return db.Board.create(postJson)
    .then((post) => {
      console.log(JSON.stringify(post));
      serviceLog();
      return post.id;
    })
    .catch((error) => {
      return error;
    });
};

export default {
  findOne,
  findAll,
  create,
};
