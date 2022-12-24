const fs = require('fs');

const upload = {
  uploadDoc: async (req, res, next) => {
    try {
      if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
        return res.status(400).json({ msg: 'Issue with uploading this doc.' });

      // app use upload
      let file = req.file.path;
      // file type
      if (
        !req.file.mimetype.includes('doc') &&
        !req.file.mimetype.includes('docx')
      ) {
        // remove file
        fs.unlinkSync(file);
        return res.status(400).json({ msg: 'This file is not supported.' });
      }

      // file size
      if (req.file.size > 2 * 1024 * 1024) {
        // remove file
        fs.unlinkSync(file);
        return res
          .status(400)
          .json({ msg: 'This file is too large (Max: 2MB)' });
      }
      // success
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  uploadAvatar: async (req, res, next) => {
    try {
      if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
        return res
          .status(400)
          .json({ msg: 'Issue with uploading this image.' });

      // app use upload
      let file = req.file.path;
      // file type
      if (
        !req.file.mimetype.includes('png') &&
        !req.file.mimetype.includes('jpg') &&
        !req.file.mimetype.includes('jpeg')
      ) {
        // remove file
        fs.unlinkSync(file);
        return res.status(400).json({ msg: 'This file is not supported.' });
      }

      // file size
      if (req.file.size > 2 * 1024 * 1024) {
        // remove file
        fs.unlinkSync(file);
        return res
          .status(400)
          .json({ msg: 'This file is too large (Max: 2MB)' });
      }
      // success
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = upload;
