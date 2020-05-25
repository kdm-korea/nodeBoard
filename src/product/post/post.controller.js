import postService from './post.service';
import userService from '../user/user.service';

const savePost = async (req, res) => {
  await postService
    .create(req.body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
};

const findOne = async (req, res) => {
  const { id } = req.params;

  await postService
    .findOne(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await postService
    .save(id, body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
};

const deletePost = async (req, res) => {
  const { id, password } = req.params;

  await userService
    .findUserById(id)
    .then((user) => userService.comparePassword(user, password))
    .then(() => postService.deleteOne(id))
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
};

const paging = async (req, res) => {
  const postRange = 5;
  const total = await postService.findMaxPage(postRange);
  const pagingPost = await postService
    .findPagingPosts(req.params.id, postRange)
    .catch((error) => {
      throw new Error(error.message);
    });

  await res.json({ totalpage: total, posts: pagingPost });
};

export default {
  savePost,
  paging,
  findOne,
  updatePost,
  deletePost,
};
