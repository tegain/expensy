const request = require('supertest');
import { Response } from 'express';
import app from '../src/App';

describe('IndexRoute', () => {
  it('should return 200 status code on GET / route', async () => {
    const response: Response = await request(app).get('/').expect(200);
    console.log(response);
    // expect(response.statusCode).toBe(200);
    // expect(response).toEqual({});
    // expect.assertions(2);
  });
});
