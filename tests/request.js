const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

require('dotenv').config();

module.exports = request;
