import db from '../../../config/mariadb.config';
import commentHelp from './comment.help.service';
import ErrorMessage from '../../help/exception';

const deleteComment = async (commentId) => {
  return db.Comment.destroy({ where: { id: commentId } });
};

const execDeleteComment = async (hash, commentId) => {
  const isComment = await commentHelp.compareCommentWriterHash(commentId, hash);
  if (!isComment) return;
  const deleteCount = deleteComment(commentId);
  if (deleteCount !== 1)
    throw new Error('Database Error ::: comment.delete.service');
  return true;
};

export default execDeleteComment;
