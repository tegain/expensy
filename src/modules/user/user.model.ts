import { Db, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import { getDb } from '@src/database/config';
import { UserInterface } from '@src/modules/user/user.interface';

export class User {
  constructor (public user: UserInterface) {}

  /**
   * Save expense to the database
   *
   * @return {ExpenseInterface}
   */
  public async save (): Promise<InsertOneWriteOpResult | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      return await db.collection('users').insertOne({ ...this.user, createdAt: Date.now() });
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }

  public static async findById (id: string | ObjectId): Promise<UserInterface | PromiseRejectionEvent> {
    const db: Db = getDb();

    try {
      const result = await db.collection('users').findOne({ _id: new ObjectId(id) });

      if (!result.firstName) {
        return Promise.reject({
          data: `Invalid user ID: ${id}.`,
          code: 'USER_NOT_FOUND'
        });
      }

      return result;
    } catch (e) {
      return Promise.reject({
        data: e,
        code: 'USER_NOT_FOUND'
      });
    }
  }
}
