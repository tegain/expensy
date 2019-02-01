import { MongoClient } from 'mongodb';

let _database: any;

export const MongoConnect = async (DB_URL: string) => {
	try {
		const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
		console.log('[Database::Info] Connected to MongoDB.');
		_database = client.db();
		return _database;
	} catch (e) {
		const error = `[Database::Error] ${e.message}`;
		console.log(error);
		throw new Error(error);
	}
};

export const getDb = () => {
	if (_database) return _database;
	return new Error('[Database::Error] Database not found.');
};
