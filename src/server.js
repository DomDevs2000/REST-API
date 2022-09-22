require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const notesRouter = require('./routes/notes');
const database = require('./app.js');
const app = express();

// ----------------------------------------------------------------
app.use(cors());
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/notes', notesRouter);
app.set('json spaces', 2);
//-----------------------------------------------------------------

//----------------------------------------------------------------
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));

module.exports = app;
