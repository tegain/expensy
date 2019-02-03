import { request } from '@tests/helpers';
import { MongoConnect, getDb } from '@src/database/config';
import app from '@src/App';
import { invalidExpense } from '@tests/fixtures/expenses';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(() => {
  getDb().close();
  console.log('Closed database connection');
});

describe('ExpenseModel', () => {
  it('should return 400 code when submitting invalid expense', async () => {
    const response = await request(app).post('/expenses').send(invalidExpense);
    expect(response.status).toBe(400);
    expect.assertions(1);
  });
});
