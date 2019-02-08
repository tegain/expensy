import express from 'express';
import session from 'express-session';
import * as bodyParser from 'body-parser';
import mongoDBStore from 'connect-mongodb-session';
import { BudgetRouter } from '@src/modules/budget/budget.router';
import { ExpenseRouter } from '@src/modules/expense/expense.router';
import { UserRouter } from '@src/modules/user/user.router';

const MongoDBStore: any = mongoDBStore(session);

class App {

  public app: express.Application;
  private store: any;

  /**
   * App constructor
   *
   * @constructor
   */
  constructor () {
    this.app = express();

    // Init app config & middlewares
    this.config();

    // Init app routes
    this.routes();

    // Get index route
    this.index();
  }

  /**
   * Bootstrap routes
   * @private
   */
  private routes (): void {
    this.app.use(UserRouter);
    this.app.use(ExpenseRouter);
    this.app.use(BudgetRouter);
  }

  /**
   * Set app configuration
   * @private
   */
  private config (): void {
    this.app.use(bodyParser.json());

    this.store = new MongoDBStore({
      uri: process.env.DB_URL,
      collection: 'sessions'
    });

    this.app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: this.store
    }));
  }

  /**
   * Index route
   * @private
   */
  private index (): void {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.json({});
    });
  }
}

export default new App().app;
