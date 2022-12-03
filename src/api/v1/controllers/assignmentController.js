const { default: mongoose } = require('mongoose');
const Assignment = require('../models//assignmentModel');
const APIFeatures = require('../utils/api_features');
const assignmentController = {
  createAssignment: async (req, res) => {
    try {
      const { title, questions } = req.body;
      const userId = req.user.id;
      const newAssignment = new Assignment({
        title,
        questions,
        createdBy: mongoose.Types.ObjectId(userId),
      });
      await newAssignment.save();
      res.status(200).json({ msg: 'Create assignment successfully.' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAssignments: async (req, res) => {
    try {
      const userId = req.user.id;
      const query = {
        ...req.query,
        limit: req.query.limit || 5,
        page: req.query.page || 1,
      };
      const features = new APIFeatures(
        Assignment.find(
          { createdBy: userId },
          'questions title duration status'
        ),
        query
      )
        .filtering()
        .paginating()
        .sorting();
      // const assignments = await Assignment.find({
      //   createdBy: userId,
      // }).limit(2);
      // const { title, questions, duration } = assignment;
      const assignments = await features.query;
      const assignmentProcess = assignments.map((assignment) => {
        const { id, title, questions, duration, status } = assignment;
        return { id, title, questions: questions.length, duration, status };
      });
      return res.status(200).json(assignmentProcess);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAssignment: async (req, res) => {
    try {
      const assignmentId = req.params.id;
      const assignment = await Assignment.findById({ _id: assignmentId });
      res.status(200).json({ assignment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editAssignment: async (req, res) => {
    try {
      const { title, questions } = req.body;
      const assignmentId = req.params.id;
      const assignment = await Assignment.findOneAndUpdate(
        { _id: assignmentId },
        { title, questions }
      );
      res.status(200).json({ message: 'edit success' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteAssignment: async (req, res) => {
    try {
      const assignmentId = req.params.id;
      await Assignment.deleteOne({ _id: assignmentId });
      res.status(200).json({ message: 'Delete success' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = assignmentController;
