import { Db, ObjectId } from 'mongodb';
import { getDb } from '@src/database/config';
import { ExpenseInterface } from './expense.interface';
import { ExpensesService } from './expenses.service';

export class Expense {
  public expense: object;

  constructor (requestExpense: object) {
    this.expense = requestExpense;
  }

  /**
   * Save expense to the database
   */
  async save (): Promise<ExpenseInterface|PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      this.expense = await ExpensesService.normalize(this.expense);
      const result = await db.collection('expenses').insertOne({ ...this.expense, createdAt: Date.now() });
      return result.ops[0];
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }

  /**
   * Delete one expense from database by id
   * @param {string|ObjectId} id
   */
  static async deleteById (id: string|ObjectId): Promise<ExpenseInterface|PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      const result = await db.collection('expenses').findOneAndDelete({ _id: new ObjectId(id) });

      if (!result.value) {
        return Promise.reject({
          data: `Invalid expense ID: ${id}.`,
          code: 'EXPENSE_NOT_FOUND'
        });
      }

      return result.value;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
