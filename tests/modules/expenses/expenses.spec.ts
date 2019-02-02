const request = require('supertest');
import app from '@src/App';

describe('ExpensesRoutes', () => {
	it('should return 200 status code on GET /expenses route', async () => {
		const response = await request(app).get('/expenses');
		expect(response.statusCode).toBe(200);
		expect(response.text).toBeDefined();
		console.log(response.text);
    expect.assertions(2);
	});
});

describe('ExpensesController', () => {
  it('should insert expense in database and return result', async () => {
    console.log('DB PATH', process.env.DB_URL);
    const expense = {
      title: 'Rent',
      amount: 700,
      categories: ['rent', 'mandatory'],
    };

    const response = await request(app).post('/expenses').send(expense);
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchObject(expense);
    expect.assertions(2);
  });
});
