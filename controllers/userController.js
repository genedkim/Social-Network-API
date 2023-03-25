const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  // Get all students
  getUsers(req, res) {
    User.find()
      .then(async (users) => {

        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  }

};
