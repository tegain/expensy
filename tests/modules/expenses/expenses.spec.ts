const request = require('supertest');
const MongoConnect = require('@src/database/config').MongoConnect;
import app from '@src/App';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

describe('ExpensesRoutes', () => {
	it('should return 200 status code on GET /expenses route', async () => {
		const response = await request(app).get('/expenses');
		expect(response.statusCode).toBe(200);
		expect(response.text).toBeDefined();
    expect.assertions(2);
	});
});

describe('ExpensesController', () => {
  it('should insert expense in database and return result', async () => {
    const expense = {
      title: 'Rent',
      amount: 700,
      categories: ['rent', 'mandatory']
    };

    const response = await request(app).post('/expenses').send(expense);
    expect(response.statusCode).toBe(200);
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse).toEqual(expect.objectContaining(expense));
    expect.assertions(2);
  });
});
