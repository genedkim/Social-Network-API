const mongoose = require("mongoose")
const db = require('../config/connection');
const {User, Thought} = require('../models');

// IIFE
(async() =>{
  await User.deleteMany({});

  await User.create({
    username: 'TestUser1',
    email: 'test1@email.com',
  });
  await User.create({
    username: 'TestUser2',
    email: 'test2@email.com',
  });
  await User.create({
    username: 'TestUser3',
    email: 'test3@email.com',
  });

  await mongoose.disconnect;

})();