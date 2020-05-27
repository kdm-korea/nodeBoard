import db from '../../../config/mariadb.config';

const execCreate = async (post, user) => {
  const dto = post;
  dto.userHash = await user.hash;
  return db.Board.create(dto).then((record) => record.id);
};

export default execCreate;
