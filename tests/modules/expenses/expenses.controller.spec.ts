import { request } from '@tests/helpers';
import { getDb, MongoConnect } from '@src/database/config';
import app from '@src/App';
import { invalidExpense, validExpense } from '@tests/fixtures/expenses';
import { Db, ObjectId } from "mongodb";

beforeAll(async () => {
  await MongoConnect(process.env.DB_URL);
});

afterAll(async () => {
  await getDb().close();
});

describe('ExpensesController', () => {

  describe('POST /expenses', () => {
    it('should insert expense in database and return result', async () => {
      const response = await request(app).post('/expenses').send(validExpense);
      expect(response.status).toBe(200);
      expect(response.body.expense).toEqual(
        expect.objectContaining({
          label: validExpense.label,
          total: validExpense.total
        })
      );
      expect.assertions(2);
    });

    it('should return 400 code when submitting invalid expense', async () => {
      const response = await request(app).post('/expenses').send(invalidExpense);
      expect(response.status).toBe(400);
      expect.assertions(1);
    });
  });

  describe('DELETE /expenses', () => {
    let validObjectID = new ObjectId();

    beforeAll(async () => {
      const db: Db = getDb();
      await db.collection('expenses').insertOne({ ...validExpense, _id: validObjectID });
    });

    afterAll(async () => {
      const db: Db = getDb();
      await db.collection('expenses').deleteOne({ _id: validObjectID });
    });

    it('should return 404 if expense ID is not a valid ObjectID', async () => {
      const response = await request(app).delete('/expenses').send({ id: '12345' });
      expect(response.status).toBe(404);
      expect.assertions(1);
    });

    it('should return 404 if expense ID is not found', async () => {
      const response = await request(app).delete('/expenses').send({ id: '5c56f20a3de7c7feb58ccc' });
      expect(response.status).toBe(404);
      expect.assertions(1);
    });

    it('should return 200 if expense is successfully deleted', async () => {
      const response = await request(app).delete('/expenses').send({ id: validObjectID });
      expect(response.status).toBe(200);
      expect.assertions(1);
    });
  })
});
