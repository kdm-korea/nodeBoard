import postService from './service/post.service';

const savePost = async (req, res) => {
  const { body, user } = req;

  await postService
    .createPost(body, user)
    .then((data) => res.json({ postId: data }))
    .catch((error) => res.json({ message: error.message }));
};

const findOne = async (req, res) => {
  const { id } = req.params;

  await postService
    .findPostById(id)
    .then((data) => res.json({ post: data }))
    .catch((error) => res.status(409).json({ message: error.message }));
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body, user } = req;

  await postService
    .updatePost(id, body, user.hash)
    .then(() => res.status(204).json())
    .catch((error) => res.json({ message: error.message }));
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { hash } = req.user;
  const { password } = req.body;

  await postService
    .deletePost(id, password, hash)
    .then(() => res.status(204).json())
    .catch((error) => res.json({ message: error.message }));
};

const paging = async (req, res) => {
  const { id } = req.params;
  const postRange = 5;

  await postService
    .pagingPosts(id, postRange)
    .then((result) => res.json(result))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  savePost,
  paging,
  findOne,
  updatePost,
  deletePost,
};
