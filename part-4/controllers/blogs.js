const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
  response.status(200).json(blogs.map(b => b.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ 'error': 'Bad Request: Title, URL or both is missing from the request' });
  }

  const blogToBeAdded = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blogToBeAdded.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog).status(200);
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
  };

  const responseFromMongoose = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(responseFromMongoose);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const getId = request.params.id;
  const deletedBlog = await Blog.findById(getId);
  if (!deletedBlog) {
    return response.status(404).json({ error: 'Blog Not Found!' });
  }
  const userWhoCreatedThisBlog = String(deletedBlog.user);
  const decodedTokenId = jwt.decode(request.token, process.env.JWT_SECRET);

  if (userWhoCreatedThisBlog === decodedTokenId.id) {
    const successfullyDeleted = await Blog.findByIdAndRemove(getId);
    if (successfullyDeleted) {
      return response.status(200).json({ message: deletedBlog });
    } else {
      console.log('user of null?!');
    }
  } else response.status(404).json({ message: ' YOU ARE NOT THE USER WHO CREATED THIS USER' });
});

blogsRouter.get('/forbidden', (req, res, next) => {
  res.status(403).json({ error: 'you are trying to access forbidden page.' });
});

module.exports = blogsRouter;