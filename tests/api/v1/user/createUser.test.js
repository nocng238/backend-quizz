const request = require('../../../request');

describe('POST /users', () => {
  test('Test the  create user when entering the required fields correctly.', async () => {
    const response = await request
      .post('/api/v1/users')
      .send({
        name: 'test create user',
        email: 'uwers13@gmail.com',
        phone: '0123456788',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Create user successfully!');
  });
  test('Test the  create user when email already exists.', async () => {
    const response = await request
      .post('/api/v1/users')
      .send({
        name: 'test create user',
        email: 'user01@gmail.com',
        phone: '0123456788',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Create user successfully!');
  });
  test('Test the  create user when phone already exists.', async () => {
    const response = await request
      .post('/api/v1/users')
      .send({
        name: 'test create user',
        email: 'email already exists',
        phone: '0399665801',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Create user successfully!');
  });
  //// name not valid
  test('Test the  create user when not entering data for a field (name).', async () => {
    const response = await request
      .post('/api/v1/users')
      .send({
        name: '',
        email: 'testuser01@gmail.com',
        phone: '1231231234',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Need to enter enough information');
  });
  //// No data
  test('Test the  create user without entering data.', async () => {
    const response = await request
      .post('/api/v1/users')
      .send({
        name: '',
        email: '',
        phone: '',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Need to enter enough information');
  });
  test('Test the  create user when email not valid.', async () => {
    const response = await request
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        name: 'hello test',
        email: 'mailNotvalid',
        phone: '0987654321',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });
  test('Test the  create user when phone not valid.', async () => {
    const response = await request
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        name: 'hello test',
        email: 'mailNotvalid@gmail.com',
        phone: '0987654',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Phone number must be greater than 10 and be number!'
    );
  });
});
