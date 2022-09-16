const request = require('../../../request');

describe('PATCH /users/reset-password/:id', () => {
  test('Check Mail not found', async () => {
    const response = await request
      .post('/api/v1/users/reset-password/63183baed32e234a6d3a20ea123')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Email does not exist!!!');
  });

  test('Check valid mail and print out user information', async () => {
    const response = await request
      .post('/api/v1/users/reset-password/6318465cd32e234a6d3a216a')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Reset password successfully!');
  });
});
