const mongoose = require('mongoose');
require('dotenv').config();

async function database() {
	mongoose.connect(process.env.MONGO_URL);
	console.log('Connected To MongoDB');
}

module.exports = database;
