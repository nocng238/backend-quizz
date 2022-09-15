const request = require('../../../request');
const User = require('../../../../src/api/v1/user/user.model');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany([
    {
      name: 'user 1',
      email: 'user1@gmail.com',
      phone: '0128464552',
      password: '123123',
      status: 'active',
    }
  ]);
});

describe('PUT /change-password-first-login/:id', () => {

  test('should return a 200 with an success message, user if user exists and form validation true', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': '12345678@',
        'confirmedPassword': '12345678@'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Change password successfully')
  });

  test('should return a 404 with an error message if user id does not exist', async () => {
    const response = await request.put(`/api/v1/auth/change-password-first-login/${'non existing id'}`)
      .send({
        'password': '12345678@',
        'confirmedPassword': '12345678@'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not exists')
  });

  test('should return a 400 with an error message, errorDetails if password in empty', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': '',
        'confirmedPassword': '12345678@'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Form validation fail')
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "Need to enter enough information",
          "path": [
            "password"
          ],
          "type": "string.empty",
          "context": {
            "label": "password",
            "value": "",
            "key": "password"
          }
        }
      ]
    )
  });

  test('should return a 400 with an error message, errorDetails if confirmedPassword do not match password', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': '12345678@',
        'confirmedPassword': ''
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Form validation fail')
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "Confirmed password must match password",
          "path": [
            "confirmedPassword"
          ],
          "type": "any.only",
          "context": {
            "valids": [
              {
                "adjust": null,
                "in": false,
                "iterables": null,
                "map": null,
                "separator": ".",
                "type": "value",
                "ancestor": 1,
                "path": [
                  "password"
                ],
                "depth": 1,
                "key": "password",
                "root": "password",
                "display": "ref:password"
              }
            ],
            "label": "confirmedPassword",
            "value": "",
            "key": "confirmedPassword"
          }
        }
      ]
    )
  });

  test('should return a 400 with an error message, errorDetails if password length less than 8', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': '1234567',
        'confirmedPassword': '1234567'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Form validation fail')
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "Password characters less than 8",
          "path": [
            "password"
          ],
          "type": "string.min",
          "context": {
            "limit": 8,
            "value": "1234567",
            "label": "password",
            "key": "password"
          }
        }
      ]
    )
  });

  test('should return a 400 with an error message, errorDetails if password greater than 30', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': 'ssssssssssssssssssssssssssssssssss',
        'confirmedPassword': '12345678@'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Form validation fail')
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "Password Characters whose length exceeds 30",
          "path": [
            "password"
          ],
          "type": "string.max",
          "context": {
            "limit": 30,
            "value": "ssssssssssssssssssssssssssssssssss",
            "label": "password",
            "key": "password"
          }
        }
      ]
    )
  });

  test('should return a 400 with an error message, errorDetails if password do not match regex', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/auth/change-password-first-login/${ user._id }`)
      .send({
        'password': '12345678',
        'confirmedPassword': '12345678'
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Form validation fail')
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "Password contains at least one number and one special character",
          "path": [
            "password"
          ],
          "type": "string.pattern.base",
          "context": {
            "regex": {},
            "value": "12345678",
            "label": "password",
            "key": "password"
          }
        }
      ]
    )
  });
});
