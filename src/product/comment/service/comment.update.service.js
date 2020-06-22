import db from "../../../config/mariadb.config";
import commentHelp from "./comment.help.service";

const execUpdateComment = async (hash, dto) => {
  const isComment = await commentHelp.compareCommentWriterHash(
    dto.commentId,
    hash
  );
  if (!isComment) return;
  const [updated] = await db.Comment.update(
    { contents: dto.contents },
    { where: { id: dto.commentId } }
  );

  if (updated !== 1)
    throw new Error("Database Error ::: Comment.Update.Service");

  return true;
};

export default execUpdateComment;
