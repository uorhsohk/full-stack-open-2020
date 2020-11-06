const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({ 'error': 'Bad Request: Title, URL or both is missing from the request' });
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

blogsRouter.get('/forbidden', function (req, res, next) {
  let err = new Error('you tried to access /Forbidden');
  err.statusCode = 403;
  next(err);
});

blogsRouter.delete('/:id', async (request, response) => {
  const getId = request.params.id;
  const user = await Blog.findByIdAndRemove(getId);
  if (user !== null) {
    return response.status(200).json({'message': 'user successfully deleted'});
  } else {
    throw Error('No User with ID found!');
  }
});

module.exports = blogsRouter;