const request = require('../../../request');

describe('Check POST offer', () => {
  test('Create new offer when enter correct field', async () => {
    const response = await request.post('/api/v1/offers').send({
      cvs: [
        {
          cvId: '632826ba803d3d5ca02d3926',
          name: 'Trung',
          email: 'testgame2221a12@gmail.com',
        },
        {
          cvId: '632827185f2c493644b13cc4',
          name: 'Khoa',
          email: 'testgame2221ab32@gmail.com',
        },
      ],
      content: 'Need to enter an array of CV ids abc',
      startDate: '2022-09-23',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('Return error massage when enter invalid date', async () => {
    const response = await request.post('/api/v1/offers').send({
      cvs: [
        {
          cvId: '6328273f5f2c493644b13cc5',
          name: 'Trung',
          email: 'testgame2221aaaa@gmail.com',
        },
        {
          cvId: '63293a482cfddea454d8a33d',
          name: 'Khoa',
          email: 'testgame2221abaa@gmail.com',
        },
      ],
      content: 'Need to enter an array of CV ids abc',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Need to enter date time');
  });
});
