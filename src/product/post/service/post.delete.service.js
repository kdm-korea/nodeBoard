import db from '../../../config/mariadb.config';
import postHelp from './post.help.service';
import userService from '../../user/service/user.help.service';

const compareWriter = async (postId, password, hash) =>
  postHelp.findOneById(postId).then(async (record) => {
    if (record.User.hash !== hash) {
      throw new Error('글 작성자가 아닙니다.');
    }
    await userService.comparePassword(record.User, password);

    return true;
  });

const execDeletePost = async (postId, password, hash) => {
  const isWriter = await compareWriter(postId, password, hash);
  if (isWriter) {
    return db.Board.destroy({
      where: {
        id: postId,
      },
    }).then((result) => console.log(result));
  }
  throw new Error('???????? Unexception Error');
};

export default execDeletePost;
