import db from '../../../config/mariadb.config';
import commentHelp from './comment.help.service';
import ErrorMessage from '../../help/exception';

const deleteComment = async (commentId) => {
  return db.Comment.destroy({ where: { id: commentId } });
};

const execDeleteComment = async (hash, dto) => {
  if (await commentHelp.compareCommentWriterHash(dto.commentId, hash)) {
    return deleteComment(dto.commentId).then((count) => {
      if (count === 1) {
        return true;
      }
      throw new Error('Database Error ::: comment.delete.service');
    });
  }
};

export default execDeleteComment;
