const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  key: String,
  isVerified: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);
module.exports = User;

