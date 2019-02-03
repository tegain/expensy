import { Db } from 'mongodb';
import { Request, Response } from 'express';
import { getDb } from '@src/database/config';
import { Expense } from './expense.model';

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
  public static async getMany (req: Request, res: Response) {
    const db: Db = getDb();
    const expenses = await db.collection('expenses').find().toArray();
    res.json(expenses);
  }

  /**
   * Add one expense to database
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  public static async addOne (req: Request, res: Response) {
    try {
      const expense: Expense = new Expense(req.body);
      await expense.save();
      res.json(expense);
    } catch (err) {
      res.status(400).json({
        data: err,
        code: 'SCHEMA_VALIDATION_ERROR'
      });
    }
  }
}
