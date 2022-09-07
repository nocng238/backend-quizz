const request = require('../../../request');

describe('GET /users/:id', () => {
  test('Check user not found', async () => {
    const response = await request
      .get('/api/v1/users/63183baed32e234a6d3a20ea123')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('User does not exist!!!');
  });

  test('Check valid user and print out user information', async () => {
    const response = await request
      .get('/api/v1/users/63183baed32e234a6d3a20ea')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      user: {
        name: 'admin',
        email: 'user02@gmail.com',
        phone: '0399665813',
        status: 'active',
      },
    });
  });
});
