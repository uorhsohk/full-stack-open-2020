const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  logger.info('connected to MongoDB');
}).catch(error => logger.error('error connecting to MongoDB'));

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use('/api/blogs', blogsRouter);

app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  }
  if (err.name === 'CastError') {
    const errorMessage = err.message;
    return res.json({ 'error': errorMessage });
  }
  next(err);
});


module.exports = app;