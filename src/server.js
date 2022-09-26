import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { app } from './app.js';

const database = async () => {
	await mongoose.connect(process.env.MONGO_URL, {
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
