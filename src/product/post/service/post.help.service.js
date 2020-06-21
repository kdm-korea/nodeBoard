import db from "../../../config/mariadb.config";
import ErrorMessage from "../../help/exception";

const findOneById = async (postId) => {
  const post = await db.Board.findOne({
    include: [{ model: db.User }],
    where: { id: postId },
  });
  if (post === null) {
    throw new ErrorMessage.NotFoundUrl("존재하지 않는 게시물입니다.");
  }
  return post;
};

export default { findOneById };
