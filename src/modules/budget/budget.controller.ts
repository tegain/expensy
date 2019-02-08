import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Normalizer } from '@src/services/Normalizer';
import { ValidationError } from "@src/types/ValidationError";
import { Budget } from '@src/modules/budget/budget.model';
import { BudgetInterface, BudgetSchema } from '@src/modules/budget/budget.interface';
import { userError } from "@src/modules/user/user.controller";

/**
 * @class BudgetController
 */
export class BudgetController {

  /**
   * Add one budget
   *
   * @param {AppRequest} req
   * @param {Response} res
   *
   * @static
   */
  public static async addOne (req: AppRequest, res: Response) {
    const validBudget: BudgetInterface = await Normalizer.normalize<BudgetInterface>(req.body, BudgetSchema);
    validBudget.author = req.session.user;
    validBudget.members.push(req.session.user);

    const budget: Budget = new Budget(validBudget);
    await budget.save();

    res.status(204).send();
  }

  /**
   * Find many budgets documents
   *
   * @param {AppRequest} req
   * @param {Response} res
   *
   * @static
   */
  public static async findMany (req: AppRequest, res: Response) {
    const { _id } = req.session.user;

    if (!ObjectId.isValid(_id)) {
      return res.status(404).json(userError(_id));
    }

    const budgets = await Budget.findMany({ 'author._id': _id });
    res.status(200).json(budgets);
  }

  /**
   * Find one budget document
   *
   * @param {AppRequest} req
   * @param {Response} res
   *
   * @static
   */
  public static async findById (req: AppRequest, res: Response) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json(budgetError(id));
    }

    const budgets = await Budget.findById(id);
    res.status(200).json(budgets);
  }

  /**
   * Update a budget document
   *
   * @param {AppRequest} req
   * @param {Response} res
   *
   * @static
   */
  public static async updateOne (req: AppRequest, res: Response) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json(budgetError(id));
    }

    const updates = await Normalizer.normalize(req.body, BudgetSchema);

    const result = await Budget.updateOne(id, updates);
    res.status(200).json(result);
  }

  /**
   * Delete a budget
   *
   * @param {AppRequest} req
   * @param {Response} res
   *
   * @static
   */
  public static async deleteOne (req: AppRequest, res: Response) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json(budgetError(id));
    }

    try {
      await Budget.deleteById(id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json(err);
    }
  }
}

/**
 * @param {string|ObjectId} id
 * @return {ValidationError}
 */
export function budgetError (id: string | ObjectId): ValidationError {
  return {
    data: `Invalid budget ID: ${id}.`,
    code: 'BUDGET_NOT_FOUND'
  };
}
