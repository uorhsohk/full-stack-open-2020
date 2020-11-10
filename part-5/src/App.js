import React, {useEffect, useState} from 'react';
import './App.css';
import ShowBlog from "./components/ShowBlogs";
import blogService from "./services/blogs";
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  // blogs
  const [blogs, setBlogs] = useState([]);

  // authentication state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState(0);

  // error message
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem('loggedBlogAppUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getBlogs().then(res => {
      setBlogs(res);
    });
  }, []);

  const handleLoginSubmit = async event => {
    event.preventDefault();

    const login = {
      username: username,
      password: password
    };

    try {
      const user = await loginService.login(login);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogSubmit = async e => {
    e.preventDefault();
    if (user !== null) {
      const newBlog = {
        title,
        author,
        url,
        likes
      };
      try {
        const responseFromCreateBlog = await blogService.creatBlog(user.token, newBlog);
        console.log('response from create blog:', responseFromCreateBlog);
        setErrorMessage(`a new blog ${title} by ${author} added.`);
        setBlogs(blogs.concat(newBlog));
        setTimeout(() => setErrorMessage(null),
          5000);
        setTitle('');
        setAuthor('');
        setUrl('');
        setLikes(0);
      } catch (e) {
        setErrorMessage('something went wrong, sorry!');
      }
    }
  };

  const loginForm = () => {
    return (
      <>
        {/*login component*/}
        <h3>log in to application</h3>
        <Notification message={errorMessage}/>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <input
              type={"text"}
              placeholder={"username"}
              value={username}
              name={"username"}
              onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            <input
              type={"password"}
              placeholder={"password ..."}
              value={password}
              onChange={({target}) => setPassword(target.value)}/>
          </div>
          <div>
            <button type={"submit"}>login</button>
          </div>
        </form>
      </>
    );
  };

  const blogForm = () => {
    return (
      <>
        {/*form component*/}
        <h1>blogs</h1>
        <Notification message={errorMessage}/>
        <div>
          <p>{user.name} logged in
            <button onClick={() => window.localStorage.clear()}>Log out</button>
          </p>
        </div>
        {/*show all blogs component*/}
        <ShowBlog blogs={blogs}/>
        <h2>create new</h2>
        <form onSubmit={handleBlogSubmit}>
          <div>
            <input
              type={"text"}
              name={"title"}
              placeholder={"title..."}
              value={title}
              onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            <input type="text"
                   name={"author"}
                   placeholder={"author..."}
                   value={author}
                   onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            <input type={"url"}
                   name={"url"}
                   placeholder={"url..."}
                   value={url}
                   onChange={({target}) => setUrl(target.value)}/>
          </div>
          <div>
            <input type="number"
                   name={"likes"}
                   placeholder={"likes..."}
                   value={likes}
                   onChange={({target}) => setLikes(Number(target.value))}/>
          </div>
          <div>
            <button type="submit">save</button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      {user === null ? loginForm() : blogForm()}
    </>
  );
};

export default App;
