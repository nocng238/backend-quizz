const mongoose = require('mongoose');
const request = require('../../../request');
const User = require('../../../../src/api/v1/user/user.model');
const helper = require('../../../test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('Check GET users with page', () => {
  test('Users are returned as json', async () => {
    await request
      .get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Should return first 10 documents', async () => {
    const response = await request.get('/api/v1/users');
    expect(response.body.users).toHaveLength(10);
  });

  test('No documents at page 99', async () => {
    const response = await request.get('/api/v1/users?page=99');
    expect(response.body.users).toHaveLength(0);
  });
});

describe('Check GET users with status and/or search', () => {
  test('Should return documents that have active status', async () => {
    const response = await request.get('/api/v1/users?status=active');
    const users = response.body.users;

    const statusUsers = users.map((user) => user.status);
    expect(statusUsers.includes('inactive')).toBe(false);
  });

  test('Should return document that its name or email includes search text', async () => {
    const response = await request.get('/api/v1/users?search=son');
    const users = response.body.users;

    const nameUsers = users.map((user) => user.name);
    const emailUsers = users.map((user) => user.email);

    expect(
      nameUsers.every((name) => name.includes('son')) ||
        emailUsers.every((email) => email.includes('son'))
    ).toBe(true);
  });

  test('No document that its name and email includes "abcxyz"', async () => {
    const response = await request.get('/api/v1/users?search=abcxyz');

    expect(response.body.users).toHaveLength(0);
  });

  test('Should return document document that its name or email includes search text and status is active can be get', async () => {
    const response = await request.get(
      '/api/v1/users?status=active&search=son'
    );
    const users = response.body.users;

    const statusUsers = users.map((user) => user.status);
    const nameUsers = users.map((user) => user.name);
    const emailUsers = users.map((user) => user.email);

    expect(statusUsers.includes('inactive')).toBe(false);
    expect(
      nameUsers.every((name) => name.includes('son')) ||
        emailUsers.every((email) => email.includes('son'))
    ).toBe(true);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
