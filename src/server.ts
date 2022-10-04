//@ts-check
import * as dotenv from 'dotenv';
dotenv.config();
const { MONGO_URL } = process.env;
import mongoose from 'mongoose';
import { app } from './app.js';

const database = async () => {
	await mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Connected To MongoDB');
};
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));

export { database };
