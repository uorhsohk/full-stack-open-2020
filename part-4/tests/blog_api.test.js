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

afterAll(() => {
  mongoose.connection.close();
});
