import db from "../../../config/mariadb.config";
import postHelp from "./post.help.service";
import ErrorMessage from "../../help/exception";

const execUpdatePost = async (postId, post, hash) => {
  const { User } = await postHelp.findOneById(postId);

  if (User.hash !== hash) {
    throw new ErrorMessage.Forbioddan("다른 사용자입니다.");
  }
  return db.Board.update(
    { title: post.title, contents: post.contents },
    { where: { id: postId } }
  );
};

export default execUpdatePost;
