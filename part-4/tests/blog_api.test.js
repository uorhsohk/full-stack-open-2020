const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/Blog');

const initialBlogPosts = [
  {
    title: '01 - To Test Blog Post',
    author: 'Test',
    url: '...',
    likes: 10,
  },
  {
    title: '02 - To Test Blog Post',
    author: 'Test',
    url: '...',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogPosts[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogPosts[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(2);
});

test('the first note is `01 - To Test Blog Post`', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].title).toBe('01 - To Test Blog Post');
});

test('id property instead of _id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});


test('a note should be added with a post method if valid', async () => {
  const newBlog = {
    title: '03 - This Blog is from Post Method Test',
    author: 'Test',
    url: '...',
    likes: 1000,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const allBlogs = await api.get('/api/blogs');
  expect(allBlogs.body.length).toBe(initialBlogPosts.length + 1);
});

test('if the note was really added to Database', async () => {
  const newBlog = {
    title: '03 - This Blog is from Post Method Test',
    author: 'Test',
    url: '...',
    likes: 1000,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const allBlogs = await api.get('/api/blogs');
  const titles = allBlogs.body.map(b => b.title);
  expect(titles).toContain('03 - This Blog is from Post Method Test');
});

test('if likes value is ignored, the it should default to value 0', async () => {
  const newBlog = {
    title: '04 -This Blog does NOT have a like property',
    author: 'no like property author',
    url: '...',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const allBlogs = await api.get('/api/blogs');
  const findABlog = allBlogs.body.find(b => b.title === '04 -This Blog does NOT have a like property');
  expect(findABlog.likes).toBe(0);
});


test('if title is missing, the response should send 400 Bad Request', async () => {
  const blogWithoutTitle = {
    author: 'Some Author without title',
    url: '...',
  };
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const allBlogs = await api.get('/api/blogs');
  expect(allBlogs.body).toHaveLength(initialBlogPosts.length);
});

afterAll(() => {
  mongoose.connection.close();
});
