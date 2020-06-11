import db from '../../../config/mariadb.config';

const execGetPage = async (dto, pageRange) => {
  const currentPage = pageRange * dto.pageId;

  return db.Comment.findAndCountAll({
    where: { postId: dto.postId },
    attributes: ['id', 'contents', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  }).then((comments) => {
    return {
      totalpage:
        parseInt(comments.count / pageRange) +
        (comments.count % pageRange === 0 ? 0 : 1),
      comments: comments.rows.slice(currentPage - pageRange, currentPage),
    };
  });
};

export default execGetPage;
