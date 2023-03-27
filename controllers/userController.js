const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find({})
      .select("-__v") // Exclude the "__v" field from the user object
      .populate({ path: "thoughts", select: "-__v" }) // Populate the "thoughts" field of the user object and exclude the "__v" field from the thought objects
      .populate({ path: "friends", select: "-__v" }) // Populate the "friends" field of the user object and exclude the "__v" field from the friend objects
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v") 
      .populate({ path: "thoughts", select: "-__v" }) 
      .populate({ path: "friends", select: "-__v" })
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      req.body, 
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.studentId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : Thought.deleteMany({ username: user.username })
            .then((thought) => {
              !thought
                ? res.status(404).json({
                  message: 'User deleted, but no thoughts found',
                })
                : res.json({ message: 'User and associated thoughts successfully deleted' })
            })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .select("-__v")  
    .populate({ path: "friends", select: "-__v" })
    .then((user) => {
      !user
        ? res.status(404).json({ message: 'No user found with that ID' })
        : res.json(user)
    })
    .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .select("-__v")  
    .populate({ path: "friends", select: "-__v" })
    .then((user) => {
      !user
        ? res.status(404).json({ message: 'No user found with that ID' })
        : res.json(user)
    })
    .catch((err) => res.status(500).json(err));
  }
};

