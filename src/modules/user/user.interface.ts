import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { ExpenseInterface } from '@src/modules/expense/expense.interface';

export interface UserInterface {
  _id: ObjectId
  email: string
  password?: string
  firstName?: string
  lastName?: string
  expenses?: ExpenseInterface[]
}

/**
 * User schema validation
 */
export const UserSchema = Joi.object().keys({
  email: Joi.string().trim().min(2).max(55).email().required(),
  password: Joi.string().trim().min(2).max(255).required(),
  firstName: Joi.string().trim().min(2).max(55),
  lastName: Joi.string().trim().min(2).max(55),
  expenses: Joi.array().items(Joi.object()).default([])
});
