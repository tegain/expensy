import Joi from 'joi';
import { ExpenseInterface, ExpenseSchema } from './expense.interface';

export class ExpensesService {
  /**
   * Normalize and validate request expense before inserting into database
   *
   * @param {object} requestExpense
   * @return {ExpenseInterface}
   * @static
   */
  public static async normalize (requestExpense: object): Promise<ExpenseInterface> {
    try {
      return await Joi.attempt(requestExpense, ExpenseSchema) as ExpenseInterface;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
