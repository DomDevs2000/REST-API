require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const app = express();
const notesRouter = require('./routes/notes');

// ----------------------------------------------------------------
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/notes', notesRouter);
//-----------------------------------------------------------------
async function database() {
	mongoose.connect(process.env.MONGO_URL);
	console.log('Connected To MongoDB');
}

//----------------------------------------------------------------
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));
