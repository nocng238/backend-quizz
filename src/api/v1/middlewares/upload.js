const fs = require('fs');

module.exports = (req, res, next) => {
  // check file exist
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
    return res.status(400).json({ msg: 'This file is too large (Max: 2MB)' });
  }
  // success
  next();
};
