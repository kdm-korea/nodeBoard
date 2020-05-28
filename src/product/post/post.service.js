import createPost from './service/post.create.service';
import findPostById from './service/post.findOne.service';
import updatePost from './service/post.update.service';
import deletePost from './service/post.delete.service';
import pagingPosts from './service/post.paging.service';

export default {
  createPost,
  findPostById,
  updatePost,
  deletePost,
  pagingPosts,
};
