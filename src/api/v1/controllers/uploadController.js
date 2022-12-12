const cloudinary = require('cloudinary');
const fs = require('fs');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
const htmlparser2 = require('htmlparser2');
const mammoth = require('mammoth');

const uploadController = {
  uploadDoc: async (req, res, next) => {
    try {
      // get file
      const file = req.file;
      let assignment = { questions: [] };
      let html = '';
      let isAssignmentTitle = false;
      let isQuestionTitle = false;
      let isAnswerTitle = false;
      let questionIndex = 0;
      let answerIndex = 0;
      //export to question
      const parser = new htmlparser2.Parser({
        onopentag(name, attributes) {
          if (
            name === 'h1' ||
            name === 'h2' ||
            name === 'h3' ||
            name === 'h4' ||
            name === 'h5'
          ) {
            isAssignmentTitle = true;
          }
          if (name === 'p') {
            isQuestionTitle = true;
            assignment.questions[questionIndex] = {};
          }
          if (name === 'ul' || name === 'ol') {
            assignment.questions[questionIndex].answers = [];
          }
          if (name === 'li') {
            isAnswerTitle = true;
            assignment.questions[questionIndex].answers[answerIndex] = {};
          }
          if (name === 'strong') {
            assignment.questions[questionIndex].answers[
              answerIndex
            ].isTrue = true;
          }
        },
        ontext(text) {
          if (isAssignmentTitle) {
            assignment.title = text;
          }
          if (isQuestionTitle) {
            assignment.questions[questionIndex].title = text;
          }
          if (isAnswerTitle) {
            assignment.questions[questionIndex].answers[answerIndex].title =
              text;
          }
        },
        onclosetag(tagname) {
          if (
            tagname === 'h1' ||
            tagname === 'h2' ||
            tagname === 'h3' ||
            tagname === 'h4' ||
            tagname === 'h5'
          ) {
            isAssignmentTitle = false;
          }
          if (tagname === 'p') {
            isQuestionTitle = false;
          }
          if (tagname === 'ul' || tagname === 'ol') {
            answerIndex = 0;
            questionIndex++;
          }
          if (tagname === 'li') {
            isAnswerTitle = false;
            answerIndex++;
          }
        },
      });
      const { value } = await mammoth.convertToHtml({
        path: file.path,
      });
      parser.write(value);
      parser.end();
      fs.unlinkSync(file.path);
      req.body.title = assignment.title;
      req.body.questions = assignment.questions;
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = uploadController;
