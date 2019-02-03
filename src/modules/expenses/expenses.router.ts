import express from 'express';
import { ExpensesController } from './expenses.controller';

export const ExpensesRouter = express.Router();

ExpensesRouter.get('/expenses', ExpensesController.findAll);
ExpensesRouter.post('/expenses', ExpensesController.create);
ExpensesRouter.delete('/expenses', ExpensesController.deleteOne);
