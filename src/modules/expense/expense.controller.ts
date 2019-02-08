import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { Normalizer } from "@src/services/Normalizer";
import { ExpenseInterface, ExpenseSchema } from './expense.interface';
import { Expense } from './expense.model';
import { User } from '@src/modules/user/user.model';

/**
 * @class ExpenseController
 */
export class ExpenseController {

  /**
   * Get all expenses from database
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  public static async findAll (req: Request, res: Response) {
    if (!req.session.user) return res.status(400).send();

    const { _id } = req.session.user;
    const expenses: ExpenseInterface[] = await User.getExpenses(_id);
    // console.log('EXPENSES', expenses);
    res.status(200).json(expenses);
  }

  /**
   * Find one expense by ID
   *
   * @param {Request} req
   * @param {Response} res
   * @static
   */
  public static async findById (req: Request, res: Response) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        data: `Invalid expense ID: ${id}.`,
        code: 'EXPENSE_NOT_FOUND'
      });
    }

    try {
      const expense: ExpenseInterface = await Expense.findById(id);
      res.status(200).json(expense);
    } catch (err) {
      res.status(404).json(err);
    }
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
      const validData = await Normalizer.normalize<ExpenseInterface>(req.body, ExpenseSchema);
      const userId = req.session.user._id;
      const result = await User.addExpense(userId, validData);
      res.status(201).json(result);
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
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        data: `Invalid expense ID: ${id}.`,
        code: 'EXPENSE_NOT_FOUND'
      });
    }

    try {
      await Expense.deleteById(id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json(err);
    }
  }
}
