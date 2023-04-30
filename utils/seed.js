const mongoose = require("mongoose")
const db = require('../config/connection');
const {User, Thought} = require('../models');

// IIFE
(async() =>{
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.create({
    username: 'bonzo',
    email: 'johnbonham@seedemail.com',
  });
  await User.create({
    username: 'plantman',
    email: 'robertplant@seedemail.com',
  });
  await User.create({
    username: 'thepagemaster',
    email: 'jimmypage@seedemail.com',
  });
  await User.create({
    username: 'jonsey',
    email: 'johnpauljones@seedemail.com',
  });

  await mongoose.disconnect;

})();