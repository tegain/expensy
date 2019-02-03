import Joi from "joi";

export interface ExpenseInterface {
  label: string
  merchantName?: string
  total: number
  date: Date|string
  categories: ExpenseCategories[]
  createdAt: number
  description?: string
  attachments?: string[]
  currency?: string
}

export enum ExpenseCategories {
  CAR = 'car',
  FEES = 'fees',
  INSURANCE = 'insurance',
  MEALS = 'meals',
  OTHER = 'other',
  RENT = 'rent',
  TAXES = 'taxes',
  TRAVEL = 'travel',
  UTILITIES = 'utilities'
}

export const ExpenseSchema = Joi.object().keys({
  label: Joi.string().trim().min(2).max(75).required(),
  merchantName: Joi.string().trim().min(2),
  description: Joi.string().trim().max(255),
  total: Joi.number().positive(),
  date: Joi.date().timestamp().required(),
  categories: Joi.array().default([ExpenseCategories.OTHER]),
  attachments: Joi.array().items(Joi.string().uri()),
  currency: Joi.string().trim().uppercase().default('EUR'),
  _id: Joi.string()
});
