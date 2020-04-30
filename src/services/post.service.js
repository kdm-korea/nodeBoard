import db from '../config/mariadb.config';

class BoardService {
  // eslint-disable-next-line class-methods-use-this
  async findAll() {
    // eslint-disable-next-line no-return-await
    return await db.Board.findAll()
      .then((result) => {
        console.log('Service ::::::::::::::::::::::::::::::::::::::::::::::::');
        return result;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

}

// eslint-disable-next-line import/prefer-default-export
export const boardService = new BoardService();
