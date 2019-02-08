import { Db, ObjectId } from 'mongodb';
import { getDb } from '@src/database/config';
import { ExpenseInterface } from '@src/modules/expense/expense.interface';
import { expenseError } from "@src/modules/expense/expense.controller";

const EXPENSES_COLLECTION = 'expenses';

export class Expense {

  constructor (public expense: ExpenseInterface) {}

  /**
   * Find one expense by ID
   *
   * @param {string|ObjectId} id
   *
   * @return {Promise<ExpenseInterface>}
   */
  public static async findById (id: string | ObjectId): Promise<ExpenseInterface> {
    const db: Db = getDb();
    try {
      const result = await db.collection(EXPENSES_COLLECTION).findOne({ _id: new ObjectId(id) });

      if (!result.label) {
        return Promise.reject(expenseError(id));
      }

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Delete one expense from database by id
   *
   * @param {string|ObjectId} id
   *
   * @return {Promise<ExpenseInterface | PromiseRejectionEvent>}
   */
  public static async deleteById (id: string | ObjectId): Promise<ExpenseInterface | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      const result = await db.collection(EXPENSES_COLLECTION).findOneAndDelete({ _id: new ObjectId(id) });

      if (!result.value) {
        return Promise.reject(expenseError(id));
      }

      return result.value;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
