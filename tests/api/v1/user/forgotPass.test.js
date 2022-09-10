const request = require('../../../request');
describe('PORT /users/forgotPass', () => {
  test('responds with json', async () => {
    const response = await request
      .post('/api/v1/users/forgotPass')
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
      .post('/api/v1/users/forgotPass')
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
      .post('/api/v1/users/forgotPass')
      .set('Accept', 'application/json')
      .send({});
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Need to enter enough information');
  });
  test('responds with json', async () => {
    const response = await request
      .get(
        '/api/v1/users/reset-password/6318465cd31232e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczMjMyNSwiZXhwIjoxNjYyODE4NzI1fQ.gdwQ5sJL71jf2rvdtmtWgF62Y8T4c7HdIMeHi6blQYg'
      )
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Invalid link');
  });
  test('responds with json', async () => {
    const response = await request
      .post(
        '/api/v1/users/reset-password/6318465cd31232e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczMjMyNSwiZXhwIjoxNjYyODE4NzI1fQ.gdwQ5sJL71jf2rvdtmtWgF62Y8T4c7HdIMeHi6blQYg'
      )
      .set('Accept', 'application/json')
      .send({
        password: '12345678',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Password contains at least one number and one special character');
  });
  test('responds with json', async () => {
    const response = await request
      .post(
        '/api/v1/users/reset-password/6318465cd31232e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczMjMyNSwiZXhwIjoxNjYyODE4NzI1fQ.gdwQ5sJL71jf2rvdtmtWgF62Y8T4c7HdIMeHi6blQYg'
      )
      .set('Accept', 'application/json')
      .send({
        password: '12345678a!',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('User Not Exists!!');
  });
  test('responds with json', async () => {
    const response = await request
      .post(
        '/api/v1/users/reset-password/6318465cd32e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczMjMyNSwiZXhwIjoxNjYyODE4NzI1fQ.gdwQ5sJL71jf2rvdtmtWgF62Y8T4c7HdIMeHi6blQYg'
      )
      .set('Accept', 'application/json')
      .send({
        password: '12345678a!',
      });
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('Internal Server Error');
  });
  
  test('responds with json', async () => {
    const response = await request
      .post(
        '/api/v1/users/reset-password/6318465cd32e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczNDg3OSwiZXhwIjoxNjYyODIxMjc5fQ.BV8iOLYMOSpSClyNXzfVBXeOzvAYd_azKrhRuKhPeqc'
      )
      .set('Accept', 'application/json')
      .send({
        password: '1234',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Password characters less than 8');
  });
  test('responds with json', async () => {
    const response = await request
      .post(
        '/api/v1/users/reset-password/6318465cd32e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczNDg3OSwiZXhwIjoxNjYyODIxMjc5fQ.BV8iOLYMOSpSClyNXzfVBXeOzvAYd_azKrhRuKhPeqc'
      )
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
      .post(
        '/api/v1/users/reset-password/6318465cd32e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczNDg3OSwiZXhwIjoxNjYyODIxMjc5fQ.BV8iOLYMOSpSClyNXzfVBXeOzvAYd_azKrhRuKhPeqc'
      )
      .set('Accept', 'application/json')
      .send({
        password: '',
      });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Need to enter enough information');
  });
});
