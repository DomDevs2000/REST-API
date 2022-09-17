require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const app = express();
const notesRouter = require('./routes/notes');
const database = require('./app.js');

// ----------------------------------------------------------------
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/notes', notesRouter);
//-----------------------------------------------------------------

//----------------------------------------------------------------
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));
