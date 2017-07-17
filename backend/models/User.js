import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for user
const userSchema = mongoose.Schema({

  facebook: String,
  twitter: String,
  google: String,
  tokens: Array,

  profile: {
    name: String,
    picture: String
  },
  preferences: Array,
  peerId: String

}, { timestamps: true });

// create the model for users
const User = mongoose.model('User', userSchema);

// Export User for shared access
module.exports = User;
