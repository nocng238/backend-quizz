const mongoose = require('mongoose');
require("dotenv").config();


const uri = process.env.MONGO_URI;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  },
);


module.exports = mongoose;
