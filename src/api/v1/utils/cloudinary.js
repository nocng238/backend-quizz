const cloudinary = require('cloudinary');

const uploads = (file, folder) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'auto',
        crop: 'fill',
        folder: folder, // name folder that configured on cloudinary
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          return resolve({
            url: res.url,
            id: res.public_id,
          });
        }
      }
    );
  });
};

const removes = (public_id) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(public_id, undefined, (err, res) => {
      if (err) return reject(err);
      else {
        return resolve(res);
      }
    });
  });
};

module.exports = { uploads, removes };
