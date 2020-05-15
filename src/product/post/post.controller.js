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
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await postService
    .save(id, body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  await postService
    .deleteOne(id)
    .then((data) => {
      res.json(data);
      next();
    })
    .catch((error) => console.log(error));
};

const findAll = async (req, res, next) => {
  await postService
    .findAll()
    .then((data) => {
      res.json(data);
      next();
    })
    .catch((error) => console.log(error));
};

export default {
  savePost,
  findOne,
  updatePost,
  deletePost,
  findAll,
};
