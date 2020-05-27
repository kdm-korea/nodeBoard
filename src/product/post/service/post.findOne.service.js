import postHelp from './post.help.service';

const execFindPostById = async (postId) => {
  return postHelp.findOneById(postId).then((record) => {
    const post = {
      title: record.title,
      contents: record.contents,
      created: record.createdAt,
      writternUser: record.User.name,
    };
    return post;
  });
};

export default execFindPostById;
