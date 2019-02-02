import express from 'express';
import { ExpensesController } from './expenses.controller';

export const ExpensesRouter = express.Router();

ExpensesRouter.get('/expenses', ExpensesController.getMany);
ExpensesRouter.post('/expenses', ExpensesController.addOne);
