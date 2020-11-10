import fetch from 'node-fetch';

const baseURL = 'http://localhost:3001/api/blogs';

const getBlogs = async () => {
  const response = await fetch(baseURL);
  return response.json();
};

const creatBlog = async (token, newBlog) => {
  const response = await fetch(baseURL, {
    method: 'post',
    body: JSON.stringify(newBlog),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });
  return await response.json();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {getBlogs, creatBlog};