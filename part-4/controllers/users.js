const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 });
  return res.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRound = 10;
  const password = body.password;
  const username = body.username;
  const name = body.name;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const createUser = new User({
    name,
    username,
    passwordHash
  });

  const savedUser = await createUser.save();

  return response.status(200).json(savedUser);
});

module.exports = usersRouter;