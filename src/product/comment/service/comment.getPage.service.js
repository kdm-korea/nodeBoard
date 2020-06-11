import db from '../../../config/mariadb.config';

const findAndCountAll = async (postId) => {
  return db.Comment.findAndCountAll({
    include: [{ model: db.User, attributes: ['name'] }],
    where: { postId: postId },
    attributes: ['id', 'contents', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });
};

const execGetPage = async (dto, pageRange) => {
  const currentPage = pageRange * dto.pageId;

  return findAndCountAll(dto.postId).then((comments) => {
    return {
      totalpage:
        parseInt(comments.count / pageRange) +
        (comments.count % pageRange === 0 ? 0 : 1),
      comments: comments.rows.slice(currentPage - pageRange, currentPage),
    };
  });
};

export default execGetPage;
