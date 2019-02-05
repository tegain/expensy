import { getDb, MongoConnect } from '@src/database/config';
import { Expense } from '@src/modules/expense/expense.model';
// import { invalidExpense } from '@tests/fixtures/expenses';
import { ObjectId } from 'mongodb';

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(() => {
  getDb().close();
});

describe('ExpenseModel', () => {
  // it('should return error when submitting invalid expense', async () => {
  //   const expense = new Expense(invalidExpense);
  //   try {
  //     await expense.save();
  //   } catch (e) {
  //     expect(e).toMatchObject({ code: 'SCHEMA_VALIDATION_ERROR' });
  //     expect.assertions(1);
  //   }
  // });

  it('should return error when trying to delete invalid objectID', async () => {
    try {
      await Expense.deleteById('12345');
    } catch (e) {
      expect(e.message).toBeDefined();
      expect.assertions(1);
    }
  });

  it('should return error when trying to delete invalid expense', async () => {
    try {
      await Expense.deleteById(new ObjectId().toHexString());
    } catch (e) {
      expect(e).toMatchObject({ code: 'EXPENSE_NOT_FOUND' });
      expect.assertions(1);
    }
  });
});
