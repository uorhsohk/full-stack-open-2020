const list_helper = require('../utils/list_helper');

describe('total likes', () => {
  const listOfAllBlogs = list_helper.blogs;
  const listWithOneBlog = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }];

  test('should return the total number of likes of all blog posts', () => {
    const result = list_helper.totalLikes(listOfAllBlogs);
    expect(result).toBe(36);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = list_helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

