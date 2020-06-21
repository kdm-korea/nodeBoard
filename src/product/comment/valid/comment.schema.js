import { header, param, body } from "express-validator";
import validate from "../../help/validChining";

const token = header("authorization")
  .notEmpty()
  .withMessage("토큰이 없습니다.");

const pageId = param("pageId")
  .isNumeric()
  .withMessage("숫자로 이루어져 있어야 합니다.")
  .notEmpty()
  .withMessage("필수 입력값입니다.");

const commentId = param("commentId")
  .isNumeric()
  .withMessage("숫자로 이루어져 있어야 합니다.")
  .notEmpty()
  .withMessage("필수 입력값입니다.");

const postId = param("postId")
  .isNumeric()
  .withMessage("숫자로 이루어져 있어야 합니다.")
  .notEmpty()
  .withMessage("필수 입력값입니다.");

const contents = body("contents")
  .notEmpty()
  .withMessage("내용은 필수 입력값입니다.");

export default {
  getCommentPage: validate([postId, pageId]),
  createComment: validate([token, postId, contents]),
  updateComment: validate([token, postId, commentId, contents]),
  deleteComment: validate([token, postId, commentId]),
};
