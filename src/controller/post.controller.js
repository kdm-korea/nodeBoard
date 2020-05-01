import boardService from '../services/post.service';

const controllerLog = () =>
  console.log(':::::::::: LEVEL_2 DEBUG LOG :::::::::: Controller');

const savePost = async (req, res, next) => {
  // TODO: 바디 데이터 검사
  controllerLog();
  await boardService.create(req.body).then((data) => {
    res.json(data);
  });
  next();
};

const findOne = async (req, res, next) => {
  controllerLog();
  await boardService.findOne(req.params.id).then((post) => res.json(post));
  next();
};

const findAll = async (req, res, next) => {
  controllerLog();
  await boardService.findAll().then((posts) => {
    res.json(posts);
  });
  next();
};

export default {
  savePost,
  findOne,
  findAll,
};
