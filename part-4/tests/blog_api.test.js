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

beforeAll(async () => {
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
  const allBlogs = await api.get('/api/blogs');
  const titles = allBlogs.body.map(b => b.title);
  expect(titles).toContain('03 - This Blog is from Post Method Test');
});

afterAll(() => {
  mongoose.connection.close();
});
