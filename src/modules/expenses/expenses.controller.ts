import { Request, Response } from 'express';
import { Db } from "mongodb";
import { getDb } from '@src/database/config';

/**
 * @class ExpensesController
 *
 * Contains expenses logic
 */
export class ExpensesController {

  /**
   * Get all expenses from database
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  static async getMany (req: Request, res: Response) {
    const db: Db = getDb();
    const expenses = await db.collection('expenses').find().toArray();
    return res.json(expenses);
  }

  /**
   * Add one expense to database
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  static async addOne (req: Request, res: Response) {
    const db: Db = getDb();
    const expense = {
      ...req.body,
      created: Date.now()
    };
    const result = await db.collection('expenses').insertOne(expense);
    res.json(result.ops[0]);
  }
}
