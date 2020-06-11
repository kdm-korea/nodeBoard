import db from '../../../config/mariadb.config';
import commentHelp from './comment.help.service';

const execUpdateComment = async (hash, dto) => {
  if (commentHelp.compareCommentWriterHash(dto.commentId, hash)) {
    return db.Comment.update(
      { contents: dto.contents },
      { where: { id: dto.commentId } }
    ).then((record) => {
      if (record[0] === 1) {
        return true;
      }
      throw new Error('Database Error ::: Comment.Update.Service');
    });
  }
};

export default execUpdateComment;
