const request = require('../../../request');
describe('PATCH /users/forgotPass', () => {
  test('responds with json', async () => {
    const response = await request
      .patch('/api/v1/users/forgotPass')
      .set('Accept', 'application/json')
      .send({
        email: 'testgame2221@gmail.com',
      });
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual('Password has been sent to email!');
  });  
});
