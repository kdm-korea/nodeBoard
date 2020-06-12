import db from '../../../config/mariadb.config';
import commentHelp from './comment.help.service';
import ErrorMessage from '../../help/exception';

const deleteComment = async (commentId) => {
  return db.Comment.destroy({ where: { id: commentId } });
};

const execDeleteComment = async (hash, commentId) => {
  if (await commentHelp.compareCommentWriterHash(commentId, hash)) {
    return deleteComment(commentId).then((count) => {
      if (count === 1) {
        return true;
      }
      throw new Error('Database Error ::: comment.delete.service');
    });
  }
};

export default execDeleteComment;
