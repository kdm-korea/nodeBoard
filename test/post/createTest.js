const board = require('../../src/product/post/post.service');

describe('Get one post', () => {
  before(() => {});

  it('Is find one post?', () => {
    const postId = 1;
    board.findOne(postId);
  });

  it('In error handling?', () => {});
});
