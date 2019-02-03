import { MongoConnect, getDb } from '@src/database/config';
import { invalidExpense } from '@tests/fixtures/expenses';
import { Expense } from "@src/modules/expenses/expense.model";

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(() => {
  getDb().close();
});

describe('ExpenseModel', () => {
  it('should return error when submitting invalid expense', async () => {
    const expense = new Expense(invalidExpense);
    try {
      await expense.save();
    } catch (e) {
      expect(e).toMatchObject({ code: 'SCHEMA_VALIDATION_ERROR' });
      expect.assertions(1);
    }
  });
});
