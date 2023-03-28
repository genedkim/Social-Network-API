const { Thought, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
        .then((user) => {
          !user
            ? res.status(404).json({ message: 'No user found with that ID' })
            : res.json(user)
        })
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : User.findOneAndUpdate(
            { _id: thought.userId },
            { $pull: { thoughts: thought._id } },
            { runValidators: true, new: true }
          )
          .then((user) => {
            !user
              ? res.status(404).json({ message: 'No user found with that ID' })
              : res.json({ message: 'Thought deleted successfully' })
          })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { runValidators: true, new: true }
    )
    .then((thought) => {
      !thought
        ? res.status(404).json({ message: 'No thought found with that ID' })
        : res.json({ message: 'Thought updated successfully' })
    })
    .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
  },

  deleteReaction(req, res) {


  }
};
