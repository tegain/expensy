import express from 'express';
import { requiresAuth } from '@src/middlewares/requiresAuth';
import { ExpenseController } from '@src/modules/expense/expense.controller';

export const ExpenseRouter: express.Router = express.Router();

/** GET /expenses */
ExpenseRouter.get('/expenses', requiresAuth, ExpenseController.findAll);

/** GET /expenses/:id */
ExpenseRouter.get('/expenses/:id', requiresAuth, ExpenseController.findById);

/** POST /expenses */
ExpenseRouter.post('/expenses', requiresAuth, ExpenseController.create);

/** DELETE /expenses/:id */
ExpenseRouter.delete('/expenses/:id', requiresAuth, ExpenseController.deleteOne);
