import { request } from '@tests/helpers';
import { getDb, MongoConnect } from '@src/database/config';
import app from '@src/App';
import { validExpense } from '@tests/fixtures/expenses';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(async () => {
  await getDb().close();
  console.log('Closed database connection');
});

describe('ExpensesController', () => {
  it('should insert expense in database and return result', async () => {
    const response = await request(app).post('/expenses').send(validExpense);
    expect(response.status).toBe(200);
    expect(response.body.expense).toEqual(
      expect.objectContaining({
        label: validExpense.label,
        total: validExpense.total
      })
    );
    expect.assertions(2);
  });
});
