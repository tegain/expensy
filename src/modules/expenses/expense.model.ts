import { Db } from 'mongodb';
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
  async save (): Promise<ExpenseInterface> {
    const db: Db = getDb();

    try {
      this.expense = await ExpensesService.normalize(this.expense);
      const result = await db.collection('expenses').insertOne({ ...this.expense, createdAt: Date.now() });
      return result.ops[0];
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
