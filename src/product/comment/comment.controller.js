import commentService from './service';

const getCommentPage = async (req, res, next) => {
  const { postId } = req.params;

  commentService
    .getCommentPage(postId)
    .then((comments) => res.status(200).json({ comments: comments }))
    .catch((error) => next(error));
};

const createComment = async (req, res, next) => {
  const { hash } = req.user;
  const dto = req.body;
  dto.postId = req.params.postId;

  await commentService
    .createComment(hash, dto)
    .then(() => res.status(204).json())
    .catch((error) => next(error));
};

const updateComment = async (req, res, next) => {
  const { hash } = req.user;
  const dto = req.body;
  dto.commnetId = req.params.commnetId;

  await commentService
    .updateComment(hash, dto)
    .then(() => res.status(204).json())
    .catch((error) => next(error));
};

const deleteComment = async (req, res, next) => {
  const { hash } = req.user;
  const dto = req.body;
  dto.commnetId = req.params.commnetId;

  await commentService
    .deleteComment(hash, dto)
    .then(() => res.status(204).json())
    .catch((error) => next(error));
};

export default { getCommentPage, createComment, updateComment, deleteComment };
