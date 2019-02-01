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
   * Get all expenses
   *
   * @method getMany
   */
  static getMany (req: Request, res: Response): Response {
    return res.json({
      expenses: [
        { id: 1, name: 'test' },
        { id: 2, name: 'test 2' },
      ]
    })
  }

  static async addOne (req: Request, res: Response) {
    const db: Db = getDb();
    const body = req.body;
    const result = await db.collection('expenses').insertOne(body);
    res.json(result.ops);
  }
}
