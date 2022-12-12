var fs = require('fs');
var readimage = require('readimage');

var filedata = fs.readFileSync('../img/img1.png');

readimage(filedata, function (err, image) {
  if (err) {
    console.log('failed to parse the image');
    console.log(err);
  }
  console.log(image);
});
