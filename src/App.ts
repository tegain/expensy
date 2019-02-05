import * as bodyParser from 'body-parser';
import express, { Response, NextFunction } from 'express';
import { ExpenseRouter } from './modules/expense/expense.router';
import { UserRouter } from './modules/user/user.router';
import { ObjectId } from "bson";


class App {

  public app: express.Application;

  /**
   * App constructor
   *
   * @constructor
   */
  constructor () {
    this.app = express();

    this.config();

    this.app.use((req: AppRequest, res: Response, next: NextFunction) => {
      req.user = {
        _id: new ObjectId(),
        firstName: 'Thomas',
        lastName: 'Test'
      };
      // console.log(req.user);
      next();
    });

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
  }

  /**
   * Set app configuration
   * @private
   */
  private config (): void {
    this.app.use(bodyParser.json());
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
