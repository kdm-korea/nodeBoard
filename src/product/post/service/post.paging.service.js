import db from "../../../config/mariadb.config";

const execPagingPosts = async (pageNum, postRange) => {
  const page = postRange * (pageNum - 1);
  const { rows, count } = await db.Board.findAndCountAll({
    offset: page,
    limit: postRange,
    attributes: ["id", "title", "createdAt"],
  });

  return { totalPage: parseInt(count / postRange), posts: rows };
};

export default execPagingPosts;
