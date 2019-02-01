const request = require('supertest');
import { Response } from 'express';
import app from '@src/App';

describe('ExpensesRoutes', () => {
	it('should return 200 status code on GET /expenses route', async () => {
		const response: Response = await request(app).get('/expenses');
		expect(response.statusCode).toBe(200);
	});
});

describe('ExpensesController', () => {
  it('should insert expense in database and return result', async () => {
    const expense = {
      title: 'Rent',
      amount: 700,
      categories: ['rent', 'mandatory'],
    };

    const response = await request(app).post('/expenses').send(expense);
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchObject(expense);
  });
});
