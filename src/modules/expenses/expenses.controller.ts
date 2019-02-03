import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { Expense } from './expense.model';
import { ExpenseInterface } from "@src/modules/expenses/expense.interface";

/**
 * @class ExpensesController
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
    const expenses: ExpenseInterface[] = await Expense.findAll();
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

    const expense: ExpenseInterface = await Expense.findById(id);
    res.status(200).json(expense);
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
      res.status(201).json(expense);
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
