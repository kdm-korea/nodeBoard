import db from '../../../config/mariadb.config';
import postHelp from './post.help.service';

const execUpdatePost = async (postId, post, hash) => {
  const writer = (await postHelp.findOneById(postId)).User;

  if (writer.hash !== hash) {
    throw new Error('다른 사용자입니다.');
  }
  return db.Board.update(
    { title: post.title, contents: post.contents },
    { where: { id: postId } }
  );
};

export default execUpdatePost;
