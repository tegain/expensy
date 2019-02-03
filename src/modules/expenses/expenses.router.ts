import express from 'express';
import { ExpensesController } from './expenses.controller';

export const ExpensesRouter = express.Router();

/** GET /expenses */
ExpensesRouter.get('/expenses', ExpensesController.findAll);

/** GET /expenses/:id */
ExpensesRouter.get('/expenses/:id', ExpensesController.findById);

/** POST /expenses */
ExpensesRouter.post('/expenses', ExpensesController.create);

/** DELETE /expenses/:id */
ExpensesRouter.delete('/expenses/:id', ExpensesController.deleteOne);
