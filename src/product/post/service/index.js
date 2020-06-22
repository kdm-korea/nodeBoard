import createPost from "./post.create.service";
import findPostById from "./post.findOne.service";
import updatePost from "./post.update.service";
import deletePost from "./post.delete.service";
import pagingPosts from "./post.paging.service";

export default {
  createPost,
  findPostById,
  updatePost,
  deletePost,
  pagingPosts,
};
