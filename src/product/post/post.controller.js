import postService from './post.service';

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

const findAll = async (req, res) => {
  await postService
    .findAll()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
};

export default {
  savePost,
  findOne,
  updatePost,
  deletePost,
  findAll,
};
