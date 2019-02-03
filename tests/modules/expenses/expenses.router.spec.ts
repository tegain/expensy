import { request } from '@tests/helpers';
import { getDb, MongoConnect } from '@src/database/config';
import app from '@src/App';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(async () => {
  await getDb().close();
  console.log('Closed database connection');
});

describe('ExpensesRoutes', () => {
	it('should return 200 status code on GET /expenses route', async () => {
		const response = await request(app).get('/expenses');
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
    expect.assertions(2);
	});
});
