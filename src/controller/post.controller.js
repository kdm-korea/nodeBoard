import { boardService } from '../services/post.service';

export const save = async (req) => {
  const { body } = req;

  // TODO: 바디 데이터 검사
  return boardService.getOne(body);
};

export const postDelete = async (req) => {
  const { body } = req;

  return boardService.delete(body);
};
