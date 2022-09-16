const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {urlencoded, json}} = require('body-parser');
const app = express();
const noteSchema = new mongoose.Schema();
// -----

// app.use(json())

async function database() {
	await mongoose.connect(process.env.MONGO_URL);
	console.log('Connected To MongoDB');
}

const Note = mongoose.model('Note', noteSchema);
const notes = new Note({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	body: {
		type: String,
		minlength: 10,
		required: true,
	},
});

// ----------------
app.get('/note', async (req, res) => {
	try {
		const notes = await Note.find({}).sort().skip().limit().exec();

		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
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
