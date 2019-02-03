import { Db, ObjectId } from 'mongodb';
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
  public static async findAll (req: Request, res: Response) {
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
  public static async create (req: Request, res: Response) {
    try {
      const expense: Expense = new Expense(req.body);
      await expense.save();
      res.json(expense);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  /**
   * Delete one expense from database
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  public static async deleteOne (req: Request, res: Response) {
    const { id } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        data: `Invalid expense ID: ${id}.`,
        code: 'EXPENSE_NOT_FOUND'
      });
    }

    try {
      const result = await Expense.deleteById(id);
      res.json(result);
    } catch (err) {
      res.status(404).json(err);
    }
  }
}
