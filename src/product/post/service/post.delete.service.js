import db from '../../../config/mariadb.config';
import postHelp from './post.help.service';
import userService from '../../user/service/user.help.service';
import ErrorMessage from '../../help/exception';

const compareWriter = async (postId, password, hash) => {
  const { User } = await postHelp.findOneById(postId);
  if (User.hash !== hash) {
    throw new ErrorMessage.Forbioddan('글 작성자가 아닙니다.');
  }
  await userService.comparePassword(User, password);

  return true;
};

const execDeletePost = async (postId, password, hash) => {
  const isWriter = await compareWriter(postId, password, hash);
  if (!isWriter) {
    throw new ErrorMessage.Forbioddan('글 작성자가 아닙니다.');
  }
  return db.Board.destroy({ where: { id: postId } }).then(console.log);
};

export default execDeletePost;
