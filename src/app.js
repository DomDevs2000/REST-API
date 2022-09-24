require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const notesRouter = require('./routes/notes');
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

module.exports = app;
