import db from '../../../config/mariadb.config';

const findMaxPage = async (postRange) => {
  return db.Board.count().then((posts) => Math.ceil(posts / postRange));
};

const execPagingPosts = async (pageNum, postRange) => {
  const page = postRange * (pageNum - 1);
  const maxPage = await findMaxPage(postRange);
  const pagePosts = await db.Board.findAll({
    offset: page,
    limit: postRange,
    attributes: ['id', 'title', 'createdAt'],
  });

  return { totalPage: maxPage, posts: pagePosts };
};

export default execPagingPosts;
