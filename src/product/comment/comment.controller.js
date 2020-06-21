import commentService from "./service";

const getCommentPage = async (req, res, next) => {
  const pageRange = 5;
  const dto = { postId: req.params.postId, pageId: req.params.pageId };

  return commentService
    .getCommentPage(dto, pageRange)
    .then((comments) => {
      console.log(comments);
      res.status(200).json(comments);
    })
    .catch((error) => next(error));
};

const createComment = async (req, res, next) => {
  const { hash } = req.user;
  const dto = req.body;

  dto.postId = req.params.postId;
  return commentService
    .createComment(hash, dto)
    .then((commentId) => res.status(200).json({ commentId: commentId }))
    .catch(next);
};

const updateComment = async (req, res, next) => {
  const { hash } = req.user;
  const dto = req.body;

  dto.commentId = req.params.commentId;
  return commentService
    .updateComment(hash, dto)
    .then(() => res.status(204).json())
    .catch(next);
};

const deleteComment = async (req, res, next) => {
  const { hash } = req.user;
  const { commentId } = req.params;
  return commentService
    .deleteComment(hash, commentId)
    .then(res.status(204).json)
    .catch(next);
};

export default { getCommentPage, createComment, updateComment, deleteComment };
