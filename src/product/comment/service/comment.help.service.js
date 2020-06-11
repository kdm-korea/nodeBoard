import db from '../../../config/mariadb.config';
import ErrorMessage from '../../help/exception';

const compareCommentWriterHash = async (commentId, hash) => {
  return db.Comment.findOne({ where: { id: commentId } }).then((comment) => {
    if (comment === null) {
      throw new ErrorMessage.ConfictError('존재하지 않는 댓글입니다.');
    } else if (comment.userHash === hash) {
      return true;
    }
    throw new ErrorMessage.Forbioddan('글쓴이가 아닙니다.');
  });
};

export default { compareCommentWriterHash };
