import express from 'express';
import { ExpenseController } from './expense.controller';

export const ExpenseRouter: express.Router = express.Router();

/** GET /expenses */
ExpenseRouter.get('/expenses', ExpenseController.findAll);

/** GET /expenses/:id */
ExpenseRouter.get('/expenses/:id', ExpenseController.findById);

/** POST /expenses */
ExpenseRouter.post('/expenses', ExpenseController.create);

/** DELETE /expenses/:id */
ExpenseRouter.delete('/expenses/:id', ExpenseController.deleteOne);
