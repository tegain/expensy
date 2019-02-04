import { getDb } from '@src/database/config';
import { Db, ObjectId } from 'mongodb';
import { ExpenseInterface } from './expense.interface';
import { ExpensesService } from './expenses.service';

export class Expense {

  public expense: object;

  constructor (requestExpense: object) {
    this.expense = requestExpense;
  }

  /**
   * Find all expenses
   *
   * @return {ExpenseInterface[]}
   */
  public static async findAll (): Promise<ExpenseInterface[]> {
    const db: Db = getDb();
    return db.collection('expenses').find().toArray();
  }

  /**
   * Find one expense by ID
   *
   * @param {string|ObjectId} id
   * @return {ExpenseInterface}
   */
  public static async findById (id: string | ObjectId): Promise<ExpenseInterface> {
    const db: Db = getDb();
    return db.collection('expenses').findOne({ _id: new ObjectId(id) });
  }

  /**
   * Delete one expense from database by id
   *
   * @param {string|ObjectId} id
   */
  public static async deleteById (id: string | ObjectId): Promise<ExpenseInterface | PromiseRejectionEvent> {
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

  /**
   * Save expense to the database
   *
   * @return {ExpenseInterface}
   */
  public async save (): Promise<any | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      this.expense = await ExpensesService.normalize(this.expense);
      return await db.collection('expenses').insertOne({ ...this.expense, createdAt: Date.now() });
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }
}
