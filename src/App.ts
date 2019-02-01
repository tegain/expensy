import express from 'express';
import { ExpensesRouter } from './modules/expenses/expenses.router';

class App {

	public app: express.Application;

  /**
   * App constructor
   *
   * @constructor
   */
	constructor () {
		this.app = express();

		this.routes();

		// Get index route
		this.index();
	}

  /**
   * Bootstrap routes
   * @private
   */
	private routes (): void {
		this.app.use(ExpensesRouter);
	}

  /**
   * Index route
   * @private
   */
	private index (): void {
	  this.app.get('/', (req: express.Request, res: express.Response) => {
	    res.json({});
    })
  }
}

export default new App().app;
