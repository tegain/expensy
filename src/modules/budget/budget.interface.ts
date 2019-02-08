import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { ExpenseInterface, ExpenseSchema } from '@src/modules/expense/expense.interface';
import { UserInterface, UserSchema } from '@src/modules/user/user.interface';

export interface BudgetInterface {
  label: string
  description?: string
  expenses?: ExpenseInterface[]
  author: UserInterface
  access?: BudgetAccess
  createdAt?: number
  date: Date | string
  total: number
  members?: ObjectId[]
}

const enum BudgetAccess {
  ONLYME,
  PRIVATE,
  PUBLIC
}

export const BudgetSchema = Joi.object().keys({
  label: Joi.string().trim().min(2).max(45).required(),
  description: Joi.string().trim().min(2).max(255),
  expenses: Joi.array().items(ExpenseSchema).default([]),
  access: Joi.number().default(BudgetAccess.ONLYME),
  author: UserSchema,
  createdAt: Joi.number(),
  budgetAmount: Joi.object().keys({
    current: Joi.number().min(0).default(0),
    total: Joi.number().min(0).default(0).required()
  }),
  date: Joi.date().timestamp(),
  members: Joi.array().items(UserSchema).default([])
});
