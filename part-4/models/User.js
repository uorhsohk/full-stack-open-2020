const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    minlength: [3, 'mindestens drei Charakter'],
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    minlength: [3, 'mindestens drei Charakter'],
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Blog'
    }
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;