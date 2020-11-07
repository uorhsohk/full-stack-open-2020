const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  if (!await isPasswordCorrect(user, req.body.password)) {
    return res.status(401).json({ error: 'username or password invalid!' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  res.status(200)
    .send({ token, username: user.username, name: user.name });
});

const isPasswordCorrect = async (user, password) => {
  return user ? await bcrypt.compare(password, user.passwordHash) : false;
};

module.exports = loginRouter;