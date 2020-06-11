import db from '../../../config/mariadb.config';
import postHelp from '../../post/service/post.help.service';
import ErrorMessage from './../../help/exception';

const createComment = async (hash, dto) => {
  return db.Comment.create({
    contents: dto.contents,
    userHash: hash,
    postId: dto.postId,
  });
};

const execCreateComment = async (hash, dto) => {
  return postHelp.findOneById(dto.postId).then((post) => {
    return createComment(hash, dto).then((comment) => comment.id);
  });
};

export default execCreateComment;
