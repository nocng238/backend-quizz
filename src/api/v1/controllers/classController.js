const User = require('../models/userModel');
const Class = require('../models/classModel');
const APIFeatures = require('../utils/api_features');
const classController = {
  createClass: async (req, res) => {
    try {
      const { className, students, teacher } = req.body;
      // check class name
      if (!className) {
        return res.status(400).json({ message: 'This class must have a name' });
      }
      //check teacher
      if (!teacher) {
        return res
          .status(400)
          .json({ message: 'This class must have an instructure' });
      }
      const newClass = new Class({
        className,
        students,
        teacher,
      });
      await newClass.save();
      res.status(200).json({ message: 'Create class successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getClasses: async (req, res) => {
    try {
      const query = {
        ...req.query,
        limit: req.query.limit || 5,
        page: req.query.page || 1,
      };
      const features = new APIFeatures(
        Class.find({ disable: false }).populate('teacher', 'name'),
        query
      );
      // const classes = await Class.find({ disable: false }).populate(
      //   'teacher',
      //   'name'
      // );
      //   const filterClasses = classes.map((class) => {
      //     return {}
      //   })
      const classes = await features.query;
      const filterClasses = classes.map((classData) => {
        const { teacher, students, className, _id } = classData;
        return {
          _id,
          className,
          teacher,
          students: students.length,
        };
      });
      res.status(200).json(filterClasses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = classController;
