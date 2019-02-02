import { request } from '@tests/helpers';
import { MongoConnect } from '@src/database/config';
import app from '@src/App';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

describe('ExpensesRoutes', () => {
	it('should return 200 status code on GET /expenses route', async () => {
		const response = await request(app).get('/expenses');
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
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
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expense));
    expect.assertions(2);
  });
});
