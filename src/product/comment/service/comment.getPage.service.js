import db from '../../../config/mariadb.config';

const findAndCountComment = async (postId, offset, limit) => {
  return db.Comment.findAndCountAll({
    include: [{ model: db.User, attributes: ['name'] }],
    where: { postId },
    attributes: ['id', 'contents', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  });
};

const execGetPage = async (dto, pageRange) => {
  const currentPage = pageRange * dto.pageId;

  const { count, rows } = await findAndCountComment(
    dto.postId,
    currentPage - pageRange,
    currentPage,
    currentPage
  );

  const totalpageData =
    parseInt(count / pageRange) + (count % pageRange === 0 ? 0 : 1);

  return {
    totalpage: totalpageData,
    comments: rows,
  };
};

export default execGetPage;
