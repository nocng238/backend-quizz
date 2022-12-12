const mongoose = require('mongoose');
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
          'questions title duration timeStart timeEnd'
        ),
        query
      )
        .filtering()
        .paginating()
        .sorting();
      const assignments = await features.query;
      const assignmentProcess = assignments.map((assignment) => {
        const { id, title, questions, duration, timeStart, timeEnd } =
          assignment;
        return {
          id,
          title,
          questions: questions.length,
          duration,
          timeStart,
          timeEnd,
        };
      });
      return res.status(200).json(assignmentProcess);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAssignment: async (req, res) => {
    try {
      const userRole = req.user.role;
      const assignmentId = req.params.id;
      const assignment = await Assignment.findById({ _id: assignmentId });
      const { _id, title, duration, questions } = assignment;
      if (userRole == 2) {
        const questionsEdit = questions.map((question, index) => {
          let countRightAnswers = 0;
          const answers = question.answers.map((answer) => {
            const { _id, isTrue } = answer;
            const answerTitle = answer.title;
            if (isTrue) {
              countRightAnswers++;
            }
            return { _id, title: answerTitle };
          });
          const { _id } = question;
          const questionTitle = question.title;
          let type = '';
          if (countRightAnswers > 1) {
            type = 'mutilpleAnswer';
          } else type = 'singleAnswer';
          return { title: questionTitle, _id, answers, type };
        });
        res
          .status(200)
          .json({ _id, title, duration, questions: questionsEdit });
      } else res.status(200).json({ assignment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editAssignment: async (req, res) => {
    try {
      const assignmentId = req.params.id;
      await Assignment.updateOne({ _id: assignmentId }, { ...req.body });

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
  studentGetAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.find(
        null,
        'questions title duration timeStart timeEnd'
      );
      const assignmentProcess = assignments.map((assignment) => {
        const { id, title, questions, duration, timeStart, timeEnd } =
          assignment;
        return {
          id,
          title,
          questions: questions.length,
          duration,
          timeStart,
          timeEnd,
        };
      });
      res.status(200).json(assignmentProcess);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = assignmentController;
