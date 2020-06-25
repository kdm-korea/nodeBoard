import db from '../../../config/mariadb.config';
import postHelp from '../../post/service/post.help.service';
import ErrorMessage from './../../help/exception';
import NotFoundHandler from '../../../middleware/error/error.NotFound.handler';
import NotFound from '../../help/exception/error.NotFound';

const createComment = async (hash, dto) => {
  return db.Comment.create({
    contents: dto.contents,
    userHash: hash,
    postId: dto.postId,
  });
};

const execCreateComment = async (hash, dto) => {
  const post = await postHelp.findOneById(dto.postId);
  if (post === null) throw new NotFound('존재하지 않는 post입니다');
  const comment = createComment(hash, dto);
  return comment.id;
};

export default execCreateComment;
