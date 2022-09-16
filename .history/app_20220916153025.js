const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { urlencoded, json } = require('body-parser');
const app = express();
const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	body: {
		type: String,
		required: true,
		minlength: 10,
	},
});
// -----
app.use(urlencoded({ extended: true }));

app.use(json());

async function database() {
	mongoose.connect(process.env.MONGO_URL);
	console.log('Connected To MongoDB');
}

const Note = mongoose.model('Note', noteSchema);

// ----------------
app.get('/note', paginatedResults(), (req, res) => {
	try {
		const notes = Note.find({}).sort();

		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(400);
	}
});

app.post('/note', async (req, res) => {
	try {
		const notesToBeCreated = req.body;
		const notes = await Note.create(notesToBeCreated);
		res.status(201).json(notes);
	} catch (error) {
		console.log(error);
		res.status(400);
	}
});

database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((e) => console.log(e));

function paginatedResults(model) {
	return (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const results = {};
		if (endIndex < model.length) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			};
		}

		results.results = model.slice(startIndex, endIndex);
		res.paginatedResults = results;
		next();
	};
}
