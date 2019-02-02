const request = require('supertest');
import app from '../src/App';

describe('IndexRoute', () => {
  it('should return 200 status code on GET / route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBeDefined();
    expect.assertions(2);
  });
});
