const request = require('../../../request');

describe('PATCH /users/resetPass/:id', () => {
  test('Check user not found', async () => {
    const response = await request
      .patch('/api/v1/users/resetPass/63183baed32e234a6d3a20ea123')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('Email does not exist!!!');
  });

  test('Check valid user and print out user information', async () => {
    const response = await request
      .patch('/api/v1/users/resetPass/6318465cd32e234a6d3a216a')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual("Reset password successfully!");
  });
});