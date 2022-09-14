const request = require('../../../request');
const { LINK_TOKEN_TEST } = require('../../../../src/constants/Auth');
describe('PORT /auth/forgot-password', () => {
  test('responds with json', async () => {
    const response = await request
      .post('/api/v1/auth/forgot-password')
      .set('Accept', 'application/json')
      .send({
        email: 'testgame2221@gmail.com',
      });
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual(
      'Password reset link sent to your email account'
    );
  });
  test('responds with json', async () => {
    const response = await request
      .post('/api/v1/auth/forgot-password')
      .set('Accept', 'application/json')
      .send({
        email: 'testgame@gmail.com',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'User with given email does not exist!'
    );
  });
  test('responds with json', async () => {
    const response = await request
      .post('/api/v1/auth/forgot-password')
      .set('Accept', 'application/json')
      .send({});
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Need to enter enough information');
  });

  test('responds with json', async () => {
    const response = await request
      .post(LINK_TOKEN_TEST)
      .set('Accept', 'application/json')
      .send({
        password: '12345678',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'Password contains at least one number and one special character'
    );
  });

  test('responds with json', async () => {
    const response = await request
      .post(LINK_TOKEN_TEST)
      .set('Accept', 'application/json')
      .send({
        password: '1234',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Password characters less than 8');
  });
  test('responds with json', async () => {
    const response = await request
      .post(LINK_TOKEN_TEST)
      .set('Accept', 'application/json')
      .send({
        password:
          '1234111111111111111asddddddddddddddddddddddddddddddddddddddddddddddddqwe',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'Password Characters whose length exceeds 30'
    );
  });
  test('responds with json', async () => {
    const response = await request
      .post(LINK_TOKEN_TEST)
      .set('Accept', 'application/json')
      .send({
        password: '',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Need to enter enough information');
  });
});
