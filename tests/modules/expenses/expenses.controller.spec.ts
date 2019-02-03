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

  /**
   * *********************************
   * GET /expenses
   * *********************************
   */
  describe('GET /expenses', () => {
    beforeAll(async () => {
      const db: Db = getDb();
      await db.dropCollection('expenses');
      await db.collection('expenses').insertOne(validExpense);
    });

    afterAll(async () => {
      const db: Db = getDb();
      await db.dropCollection('expenses');
    });

    it('should return 200 status code on GET /expenses route', async () => {
      const response = await request(app).get('/expenses');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveLength(1);
      expect.assertions(3);
    });
  });

  /**
   * *********************************
   * GET /expenses/:id
   * *********************************
   */
  describe('GET /expenses/:id', () => {
    let expenseID: ObjectId = null;

    beforeAll(async () => {
      const db: Db = getDb();
      const doc = await db.collection('expenses').insertOne(validExpense);
      expenseID = doc.insertedId;
    });

    it('should return 200 with expense object', async () => {
      const response = await request(app).get('/expenses/' + expenseID);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(expenseID.toHexString());
      expect.assertions(3);
    });

    it('should return 404 with non existent expense', async () => {
      const response = await request(app).get('/expenses/12345');
      expect(response.status).toBe(404);
      expect.assertions(1);
    });
  });

  /**
   * *********************************
   * POST /expenses
   * *********************************
   */
  describe('POST /expenses', () => {
    it('should insert expense in database and return result', async () => {
      const response = await request(app).post('/expenses').send(validExpense);
      expect(response.status).toBe(201);
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

  /**
   * *********************************
   * DELETE /expenses/:id
   * *********************************
   */
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
      const response = await request(app).delete('/expenses/12345');
      expect(response.status).toBe(404);
      expect.assertions(1);
    });

    it('should return 404 if expense ID is not found', async () => {
      const response = await request(app).delete('/expenses/5c56f20a3de7c7feb58ccc');
      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
      expect.assertions(2);
    });

    it('should return 200 if expense is successfully deleted', async () => {
      const response = await request(app).delete('/expenses/' + validObjectID);
      expect(response.status).toBe(204);
      expect.assertions(1);
    });
  })
});
