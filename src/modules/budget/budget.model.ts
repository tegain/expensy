import { Db, FilterQuery, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import { getDb } from '@src/database/config';
import { BudgetInterface } from '@src/modules/budget/budget.interface';
import { ExpenseInterface } from '@src/modules/expense/expense.interface';

const BUDGETS_COLLECTION: string = 'budgets';

/**
 * @class Budget
 */
export class Budget {

  constructor (public budget: BudgetInterface) {}

  /**
   * Find budgets documents
   *
   * @param {FilterQuery<BudgetInterface>} options
   *
   * @return {Promise<BudgetInterface[]>}
   */
  public static async findMany (options: FilterQuery<BudgetInterface>): Promise<BudgetInterface[]> {
    const db: Db = getDb();

    try {
      const filters = options || {};
      return await db.collection(BUDGETS_COLLECTION).find(filters).toArray();
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'BUDGETS_NOT_FOUND'
      });
    }
  }

  /**
   * Find budget by ID
   *
   * @param {ObjectId|string} id
   *
   * @return {Promise<BudgetInterface>}
   */
  public static async findById (id: string | ObjectId): Promise<BudgetInterface> {
    const db: Db = getDb();

    try {
      const result = await db.collection(BUDGETS_COLLECTION).findOne({ _id: new ObjectId(id) });

      if (!result) {
        return Promise.reject({
          data: `Invalid budget ID: ${id}.`,
          code: 'BUDGET_NOT_FOUND'
        });
      }

      return result;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'BUDGET_NOT_FOUND'
      });
    }
  }

  /**
   * Update one budget from database by id
   *
   * @param {string|ObjectId} id
   * @param {FilterQuery<BudgetInterface>} updates
   *
   * @return {Promise<BudgetInterface | PromiseRejectionEvent>}
   */
  public static async updateOne (id: string | ObjectId, updates: FilterQuery<BudgetInterface>): Promise<BudgetInterface | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      const result = await db.collection(BUDGETS_COLLECTION).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates }
      );

      if (!result.value) {
        return Promise.reject({
          data: `Invalid budget ID: ${id}.`,
          code: 'BUDGET_NOT_FOUND'
        });
      }

      return result.value;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Delete one budget from database by id
   *
   * @param {string|ObjectId} id
   *
   * @return {Promise<BudgetInterface | PromiseRejectionEvent>}
   */
  public static async deleteById (id: string | ObjectId): Promise<BudgetInterface | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      const result = await db.collection(BUDGETS_COLLECTION).findOneAndDelete({ _id: new ObjectId(id) });

      if (!result.value) {
        return Promise.reject({
          data: `Invalid budget ID: ${id}.`,
          code: 'BUDGET_NOT_FOUND'
        });
      }

      return result.value;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Add expense to budget document
   *
   * @param {ObjectId|string} budgetId
   * @param {ExpenseInterface} expense
   *
   * @return {Promise<ExpenseInterface[]>}
   */
  public static async addExpense (budgetId: string | ObjectId, expense: ExpenseInterface): Promise<ExpenseInterface[]> {
    const db: Db = getDb();

    try {
      const result = await db.collection(BUDGETS_COLLECTION).findOneAndUpdate(
        { _id: new ObjectId(budgetId) },
        {
          $push: { expenses: expense },
          $inc: { 'budgetAmount.current': expense.total }
        }
      );

      if (!result.value) {
        return Promise.reject({
          data: `Invalid budget ID: ${budgetId}.`,
          code: 'BUDGET_NOT_FOUND'
        });
      }

      return result.value;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'BUDGET_NOT_FOUND'
      });
    }
  }

  /**
   * Save budget to the database
   *
   * @return {ExpenseInterface}
   */
  public async save (): Promise<InsertOneWriteOpResult | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      return await db.collection(BUDGETS_COLLECTION).insertOne({ ...this.budget, createdAt: Date.now() });
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }
}
