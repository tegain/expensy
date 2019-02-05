import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { ExpenseInterface } from '@src/modules/expense/expense.interface';

export interface UserInterface {
  _id: ObjectId
  firstName: string
  lastName: string
  expenses?: ExpenseInterface[]
}

export const UserSchema = Joi.object().keys({
  firstName: Joi.string().trim().min(2).max(55).required(),
  lastName: Joi.string().trim().min(2).max(55).required(),
  expenses: Joi.array().items(Joi.object()).default([])
});
