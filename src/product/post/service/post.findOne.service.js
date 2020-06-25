import postHelp from './post.help.service';

const execFindPostById = async (postId) => {
  const recordPost = await postHelp.findOneById(postId);
  return {
    title: recordPost.title,
    contents: recordPost.contents,
    created: recordPost.createdAt,
    writternUser: recordPost.User.name,
  };
};

export default execFindPostById;
