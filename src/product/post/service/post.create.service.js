import db from '../../../config/mariadb.config';

const execCreate = async (post, { hash }) => {
  const dto = post;
  dto.userHash = hash;
  const { id } = db.Board.create(dto);
  return id;
};

export default execCreate;
