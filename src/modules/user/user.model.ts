import { Db, FilterQuery, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import { getDb } from '@src/database/config';
import { ExpenseInterface } from '@src/modules/expense/expense.interface';
import { UserInterface } from '@src/modules/user/user.interface';
import { userError } from '@src/modules/user/user.controller';

const USERS_COLLECTION: string = 'users';

export class User {

  constructor (public user: UserInterface) {}

  /**
   * Find one user
   *
   * @param {object} filter
   */
  public static async findOne (filter: FilterQuery<UserInterface>): Promise<UserInterface> {
    const db: Db = getDb();

    try {
      return await db.collection(USERS_COLLECTION).findOne(
        filter,
        { projection: { expenses: 0 } }
      );
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'USER_NOT_FOUND'
      });
    }
  }

  /**
   * Find user by ID
   *
   * @param {ObjectId|string} id
   *
   * @return {Promise<UserInterface>}
   */
  public static async findById (id: string | ObjectId): Promise<UserInterface> {
    const db: Db = getDb();

    try {
      const result = await db.collection(USERS_COLLECTION).findOne(
        { _id: new ObjectId(id) },
        { projection: { expenses: 0 } }
      );

      if (!result.firstName) {
        return Promise.reject(userError(id));
      }

      return result;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'USER_NOT_FOUND'
      });
    }
  }

  /**
   * Get user expenses
   *
   * @param {ObjectId|string} userId
   *
   * @return {Promise<ExpenseInterface[]>}
   */
  public static async getExpenses (userId: string | ObjectId): Promise<ExpenseInterface[]> {
    const db: Db = getDb();

    try {
      const user: UserInterface = await db.collection(USERS_COLLECTION).findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return Promise.reject(userError(userId));
      }

      return user.expenses;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'USER_NOT_FOUND'
      });
    }
  }

  /**
   * Add expense to user document
   *
   * @param {ObjectId|string} userId
   * @param {ExpenseInterface} expense
   *
   * @return {Promise<UserInterface[]>}
   */
  public static async addExpense (userId: string | ObjectId, expense: ExpenseInterface): Promise<ExpenseInterface[]> {
    const db: Db = getDb();

    try {
      const result = await db.collection(USERS_COLLECTION).findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $push: { expenses: expense } },
        { projection: { expenses: 1 } }
      );

      if (!result.value) {
        return Promise.reject(userError(userId));
      }

      return result.value;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'USER_NOT_FOUND'
      });
    }
  }

  /**
   * Save expense to the database
   *
   * @return {ExpenseInterface}
   */
  public async save (): Promise<InsertOneWriteOpResult | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      return await db.collection(USERS_COLLECTION).insertOne({ ...this.user, createdAt: Date.now() });
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }
}
