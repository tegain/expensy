// tslint:disable-next-line
import './config';
import app from './App';
import { MongoConnect } from './database/config';

const PORT: number = 3000;

MongoConnect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, (err: Error) => {
      if (err) return console.log(err);
      console.log(`[App::Info] Server is running at http://localhost:%s`, PORT);
    });
  })
  .catch((err) => console.log(err));
