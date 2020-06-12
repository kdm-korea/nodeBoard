import db from '../../../config/mariadb.config';

const findAndCountAll({
    include: [{ model: db.User, atlComment = async (postId) => {
  return db.Comment.findAndCountAltributes: ['name'] }],
    where: { postId: postId },
    attributes: ['id', 'contents', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });
};

const execGetPage = async (dto, pageRange) => {
  const currentPage = pageRange * dto.pageId;

  return findAndCountAllComment(dto.postId).then((comments) => {
    let totalpageData =
      parseInt(comments.count / pageRange) +
      (comments.count % pageRange === 0 ? 0 : 1);

    let commentsData = comments.rows.slice(
      currentPage - pageRange,
      currentPage
    );

    return {
      totalpage: totalpageData,
      comments: commentsData,
    };
  });
};

export default execGetPage;
