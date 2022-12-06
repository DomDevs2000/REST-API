import * as dotenv from 'dotenv';

dotenv.config();
const { MONGO_URL } = process.env;
const { MONGO_URI } = process.env;
import mongoose from 'mongoose';
import { app } from './app.js';

const isValidMongoUrl = (mongoUrl: string | undefined): mongoUrl is string => {
	return mongoUrl !== undefined;
};

const mongoUrl = MONGO_URI;

if (!isValidMongoUrl(mongoUrl)) {
	throw new Error('Mongo URL Required');
}

const database = async () => {
	await mongoose.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(MONGO_URL)
	console.log(MONGO_URI)
	console.log('Connected To MongoDB');
};
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));

export { database };
