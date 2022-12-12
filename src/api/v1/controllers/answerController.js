const { json } = require('body-parser');
const { query } = require('express');
const { func } = require('joi');
const mongoose = require('mongoose');

const Answer = require('../models/answerModel');
const Assignment = require('../models/assignmentModel');
const APIFeatures = require('../utils/api_features');
const answerController = {
  checkIsAssignmentAttempted: async (req, res) => {
    try {
    } catch (error) {}
  },
  submitAnswer: async (req, res) => {
    try {
      const studentId = req.user.id;
      const { answers, assignmentId, timeStart, timeEnd } = req.body;
      const userAnswer = await Answer.findOne({ studentId, assignmentId });
      if (userAnswer) {
        return res
          .status(200)
          .json({ message: "you're already done this test" });
      }
      const assignment = await Assignment.findById(assignmentId, 'questions');
      let corectAnswers = 0;
      const numberOfQuestions = assignment.questions.length;
      const questions = assignment.questions;
      //Cham diem
      for (let index = 0; index < numberOfQuestions; index++) {
        const answerArr = answers[questions[index]._id];
        if (!answerArr || answerArr.length === 0) {
          continue;
        } else {
          //convert arr to object with key = id
          const answersObject = questions[index].answers.reduce(
            (a, v) => ({ ...a, [v._id]: v }),
            {}
          );
          answerArr.every((answer) => answersObject[answer].isTrue)
            ? corectAnswers++
            : null;
        }
      }
      const score = (10 / numberOfQuestions) * corectAnswers;
      const newAnswer = await Answer.create({
        studentId,
        assignmentId,
        answers,
        timeStart,
        timeEnd,
        score,
        corectAnswers,
        numberOfQuestions,
      });
      await newAnswer.save();
      res.status(200).json({ message: 'Submit success' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  getAnswersHistory: async (req, res) => {
    try {
      const studentId = req.user.id;
      const query = {
        ...req.query,
        limit: req.query.limit || 5,
        page: req.query.page || 1,
      };
      const features = new APIFeatures(
        Answer.find(
          { studentId },
          'timeStart timeEnd score corectAnswers numberOfQuestions'
        ).populate('assignmentId', 'title'),
        query
      )
        .filtering()
        .paginating()
        .sorting();
      const answersHistory = await features.query;
      res.status(200).json(answersHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSubmissions: async (req, res) => {
    try {
      const assignmentId = req.params.id;
      const submissions = await Answer.find(
        { assignmentId },
        'timeStart timeEnd score corectAnswers numberOfQuestions'
      )
        .populate('studentId', 'name userName')
        .sort('-createdAt');
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = answerController;
