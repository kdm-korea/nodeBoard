import postService from './service';

const createPost = (req, res) => {
  const { body, user } = req;

  postService
    .createPost(body, user)
    .then((data) => res.json({ postId: data }))
    .catch((error) => res.json({ message: error.message }));
};

const findOne = (req, res) => {
  const { postId } = req.params;

  postService
    .findPostById(postId)
    .then((data) => res.json({ post: data }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const updatePost = (req, res) => {
  const { postId } = req.params;
  const { body, user } = req;

  postService
    .updatePost(postId, body, user.hash)
    .then(() => res.status(204).json())
    .catch((error) => res.status(403).json({ message: error.message }));
};

const deletePost = (req, res) => {
  const { postId } = req.params;
  const { hash } = req.user;
  const { password } = req.body;

  postService
    .deletePost(postId, password, hash)
    .then(() => res.status(204).json())
    .catch((error) => res.status(404).json({ message: error.message }));
};

const paging = (req, res) => {
  const { pageId } = req.params;
  const postRange = 5;

  postService
    .pagingPosts(pageId, postRange)
    .then((result) => res.json(result))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  createPost,
  paging,
  findOne,
  updatePost,
  deletePost,
};
