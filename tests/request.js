const request = require('supertest');

require('dotenv').config();

module.exports = request(process.env.BASE_URL);
