import express from 'express';
import { requiresAuth } from '@src/middlewares/requiresAuth';
import { BudgetController } from '@src/modules/budget/budget.controller';

export const BudgetRouter: express.Router = express.Router();

/** POST /budgets */
BudgetRouter.post('/budgets', requiresAuth, BudgetController.addOne);

/** GET /budgets */
BudgetRouter.get('/budgets', requiresAuth, BudgetController.findMany);

/** GET /budgets/:id */
BudgetRouter.get('/budgets/:id', requiresAuth, BudgetController.findById);

/** PATCH /budgets */
BudgetRouter.patch('/budgets/:id', requiresAuth, BudgetController.updateOne);

/** DELETE /budgets */
BudgetRouter.delete('/budgets/:id', requiresAuth, BudgetController.deleteOne);
