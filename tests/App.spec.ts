import { request } from '@tests/helpers';
import app from '../src/App';

describe('IndexRoute', () => {
  it('should return 200 status code on GET / route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect.assertions(2);
  });
});
