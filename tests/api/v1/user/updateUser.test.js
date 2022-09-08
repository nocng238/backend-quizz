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

describe('PUT /users/:id', () => {

  it('should return a 200 with an success message, user if user exists and form validation true', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "user 2",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Update user successfully")
    expect(response.body.user).toMatchObject(
      {
        "name": "user 2",
        "phone": "0828464532",
      }
    )
  });

  it('should return a 404 with an error message if user id does not exist', async () => {
    const response = await request.put(`/api/v1/users/${'non existing id'}`)
      .send({
        "name": "user 2",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(404)
    expect(response.body.message).toBe("User not exists")
  });

  it('should return a 400 with an error message, errorDetails if name in empty', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"name\" is not allowed to be empty",
          "path": [
            "name"
          ],
          "type": "string.empty",
          "context": {
            "label": "name",
            "value": "",
            "key": "name"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if name length less than 3', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "ab",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"name\" length must be at least 3 characters long",
          "path": [
            "name"
          ],
          "type": "string.min",
          "context": {
            "limit": 3,
            "value": "ab",
            "label": "name",
            "key": "name"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if name length greater than 30', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "ab",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"name\" length must be at least 3 characters long",
          "path": [
            "name"
          ],
          "type": "string.min",
          "context": {
            "limit": 3,
            "value": "ab",
            "label": "name",
            "key": "name"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if name does not match the required pattern: /^[ A-Za-z0-9]+$/', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "abc$",
        "phone": "0828464532",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"name\" with value \"abc$\" fails to match the required pattern: /^[ A-Za-z0-9]+$/",
          "path": [
            "name"
          ],
          "type": "string.pattern.base",
          "context": {
            "regex": {},
            "value": "abc$",
            "label": "name",
            "key": "name"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if phone is empty', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "user 2",
        "phone": "",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"phone\" is not allowed to be empty",
          "path": [
            "phone"
          ],
          "type": "string.empty",
          "context": {
            "label": "phone",
            "value": "",
            "key": "phone"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if phone length does not equal 10', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "user 2",
        "phone": "012345678910",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"phone\" length must be 10 characters long",
          "path": [
            "phone"
          ],
          "type": "string.length",
          "context": {
            "limit": 10,
            "value": "012345678910",
            "label": "phone",
            "key": "phone"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if name does not match the required pattern:  /^[0-9]+$/', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "user 2",
        "phone": "0828464b3a",
        "status": "inactive"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"phone\" with value \"0828464b3a\" fails to match the required pattern: /^[0-9]+$/",
          "path": [
            "phone"
          ],
          "type": "string.pattern.base",
          "context": {
            "regex": {},
            "value": "0828464b3a",
            "label": "phone",
            "key": "phone"
          }
        }
      ]
    )
  });

  it('should return a 400 with an error message, errorDetails if status is neither active or inactive', async () => {
    const user = await User.findOne()
    const response = await request.put(`/api/v1/users/${ user._id }`)
      .send({
        "name": "user 2",
        "phone": "0828464532",
        "status": "abcd"
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Form validation fail")
    expect(response.body.errorDetails).toMatchObject(
      [
        {
          "message": "\"status\" must be one of [active, inactive]",
          "path": [
            "status"
          ],
          "type": "any.only",
          "context": {
            "valids": [
              "active",
              "inactive"
            ],
            "label": "status",
            "value": "abcd",
            "key": "status"
          }
        }
      ]
    )
  });

});